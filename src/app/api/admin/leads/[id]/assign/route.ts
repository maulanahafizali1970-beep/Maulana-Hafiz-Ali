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

  let body: { userId?: string; note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const userId = cleanOptional(body.userId, 100);
  const note = cleanOptional(body.note, 500);

  if (!userId) return NextResponse.json({ error: 'userId is required.' }, { status: 400 });

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target || !target.active) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

  const updated = await prisma.lead.update({
    where: { id },
    data: { assignedToId: userId },
    include: { assignedTo: { select: { id: true, name: true } } },
  });

  await prisma.leadAssignment.create({
    data: {
      leadId: id,
      userId,
      assignedBy: auth.user.id,
      note,
    },
  });

  await prisma.notification.create({
    data: {
      userId,
      leadId: id,
      type: 'assignment',
      title: 'Lead assigned to you',
      message: `${updated.name} (${updated.phone}) was assigned to you.`,
    },
  });

  await logActivity({
    userId: auth.user.id,
    leadId: id,
    action: 'LEAD_ASSIGNED',
    details: `Assigned to ${target.name}`,
  });

  return NextResponse.json({ lead: updated });
}