import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { cleanOptional } from '@/lib/validation';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  let body: { dueAt?: string; note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const dueAt = body.dueAt ? new Date(body.dueAt) : null;
  if (!dueAt || Number.isNaN(dueAt.getTime())) {
    return NextResponse.json({ error: 'Valid dueAt datetime is required.' }, { status: 400 });
  }

  const followup = await prisma.leadFollowup.create({
    data: {
      leadId: id,
      userId: auth.user.id,
      dueAt,
      note: cleanOptional(body.note, 1000),
    },
  });

  await prisma.notification.create({
    data: {
      userId: auth.user.id,
      leadId: id,
      type: 'followup',
      title: 'Follow-up scheduled',
      message: `Follow-up set for ${dueAt.toLocaleString()}`,
    },
  });

  await prisma.activityLog.create({
    data: { userId: auth.user.id, leadId: id, action: 'FOLLOWUP_CREATED', details: `Due ${dueAt.toISOString()}` },
  });

  return NextResponse.json({ followup });
}

export async function GET(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;
  const followups = await prisma.leadFollowup.findMany({
    where: { leadId: id },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { dueAt: 'desc' },
  });
  return NextResponse.json({ followups });
}