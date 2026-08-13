import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import type { Prisma } from '@/generated/prisma/client';

export const runtime = 'nodejs';

function csvEscape(value: unknown): string {
  const s = value == null ? '' : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function leadToRow(lead: Record<string, unknown> & { status?: unknown; tags?: unknown[]; assignedTo?: unknown }): string {
  const tags = Array.isArray(lead.tags)
    ? (lead.tags as Array<{ tag?: { name?: string } }>).map((t) => t.tag?.name ?? '').join('; ')
    : '';
  return [
    lead.leadNo,
    lead.name,
    lead.phone,
    lead.email,
    lead.country,
    lead.city,
    lead.message,
    (lead.status as { name?: string } | null)?.name ?? '',
    (lead.assignedTo as { name?: string } | null)?.name ?? '',
    lead.priority,
    lead.sourcePage,
    lead.formName,
    lead.utmSource,
    lead.utmMedium,
    lead.utmCampaign,
    lead.utmTerm,
    lead.utmContent,
    lead.ipAddress,
    lead.deviceInfo,
    lead.browserInfo,
    tags,
    new Date(lead.createdAt as string).toISOString(),
    new Date(lead.updatedAt as string).toISOString(),
  ]
    .map(csvEscape)
    .join(',');
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;

  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('mode') ?? 'all'; // all | filtered | selected
  const selected = searchParams.get('ids')?.split(',').filter(Boolean) ?? [];

  const where: Prisma.LeadWhereInput = { deletedAt: null };
  if (mode === 'selected' && selected.length) {
    where.id = { in: selected };
  } else if (mode === 'filtered') {
    const search = searchParams.get('search')?.trim() ?? '';
    const statusId = searchParams.get('statusId') ?? '';
    const assigneeId = searchParams.get('assigneeId') ?? '';
    const dateFrom = searchParams.get('dateFrom') ?? '';
    const dateTo = searchParams.get('dateTo') ?? '';
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search.replace(/[\s\-()]/g, '') } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (statusId) where.statusId = statusId;
    if (assigneeId) where.assignedToId = assigneeId;
    if (dateFrom) where.createdAt = { ...(where.createdAt as object), gte: new Date(dateFrom) };
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      where.createdAt = { ...(where.createdAt as object), lte: end };
    }
  }

  const leads = await prisma.lead.findMany({
    where,
    include: { status: true, assignedTo: { select: { name: true } }, tags: { include: { tag: true } } },
    orderBy: { createdAt: 'desc' },
    take: 5000,
  });

  const header =
    'Lead ID,Name,Phone,Email,Country,City,Message,Status,Assigned To,Priority,Source Page,Form Name,UTM Source,UTM Medium,UTM Campaign,UTM Term,UTM Content,IP Address,Device,Browser,Tags,Created At,Updated At';
  const rows = leads.map((l) => leadToRow(l as never));
  const csv = [header, ...rows].join('\n');

  return new NextResponse('\uFEFF' + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-export-${Date.now()}.csv"`,
    },
  });
}