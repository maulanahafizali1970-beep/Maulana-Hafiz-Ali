import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { logActivity } from '@/lib/activity';
import { cleanOptional } from '@/lib/validation';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  let body: { statusId?: string; note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const statusId = cleanOptional(body.statusId, 100);
  if (!statusId) return NextResponse.json({ error: 'statusId is required.' }, { status: 400 });

  const lead = await prisma.lead.findUnique({ where: { id }, include: { status: true } });
  if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

  const newStatus = await prisma.leadStatus.findUnique({ where: { id: statusId } });
  if (!newStatus) return NextResponse.json({ error: 'Status not found.' }, { status: 404 });

  const updated = await prisma.lead.update({
    where: { id },
    data: { statusId: newStatus.id },
    include: { status: true },
  });

  await prisma.leadStatusHistory.create({
    data: {
      leadId: id,
      fromStatusId: lead.statusId,
      toStatusId: newStatus.id,
      changedById: auth.user.id,
      note: cleanOptional(body.note, 500),
    },
  });

  await logActivity({
    userId: auth.user.id,
    leadId: id,
    action: 'STATUS_CHANGED',
    details: `${lead.status?.name ?? 'None'} -> ${newStatus.name}`,
  });

  return NextResponse.json({ lead: updated });
}