import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { createLead } from '@/lib/leads';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;

  const formData = await request.formData();
  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'A file is required.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let workbook: XLSX.WorkBook;
  try {
    workbook = XLSX.read(buffer, { type: 'buffer' });
  } catch {
    return NextResponse.json({ error: 'Could not parse the file. Use CSV or XLSX.' }, { status: 400 });
  }

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  const defaultStatus = await prisma.leadStatus.findFirst({ where: { isDefault: true }, orderBy: { sortOrder: 'asc' } });

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const get = (...keys: string[]) => {
      for (const k of keys) {
        const v = row[k];
        if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
        const lower = Object.keys(row).find((rk) => rk.toLowerCase() === k.toLowerCase());
        if (lower) {
          const lv = row[lower];
          if (lv !== undefined && lv !== null && String(lv).trim() !== '') return String(lv).trim();
        }
      }
      return '';
    };

    const name = get('name', 'fullName', 'full_name', 'Full Name');
    const phone = get('phone', 'mobile', 'whatsapp', 'Phone', 'Mobile Number');
    const email = get('email', 'Email');

    if (!name || !phone) {
      skipped++;
      errors.push(`Row ${i + 1}: missing name or phone, skipped`);
      continue;
    }

    const normalizedPhone = phone.replace(/[\s\-()]/g, '');
    const duplicate = await prisma.lead.findFirst({
      where: {
        deletedAt: null,
        OR: [
          { phone: normalizedPhone },
          ...(email ? [{ email: email.toLowerCase() }] : []),
        ],
      },
    });

    if (duplicate) {
      skipped++;
      errors.push(`Row ${i + 1}: duplicate detected (${name}, ${phone})`);
      continue;
    }

    try {
      await createLead({
        name,
        phone,
        email: email || undefined,
        country: get('country', 'Country'),
        city: get('city', 'City'),
        message: get('message', 'problem', 'description', 'Message'),
        sourcePage: get('sourcePage', 'source_page', 'Source Page'),
        formName: get('formName', 'form_name', 'Form Name') || 'import',
        priority: (['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const).includes(get('priority', 'Priority').toUpperCase() as never)
          ? (get('priority', 'Priority').toUpperCase() as never)
          : 'MEDIUM',
      });
      imported++;
    } catch {
      skipped++;
      errors.push(`Row ${i + 1}: failed to import (${name})`);
    }
  }

  await prisma.activityLog.create({
    data: {
      userId: auth.user.id,
      action: 'LEADS_IMPORTED',
      details: `Imported ${imported}, skipped ${skipped} from file`,
    },
  });

  return NextResponse.json({ imported, skipped, errors });
}