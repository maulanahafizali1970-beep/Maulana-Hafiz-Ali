import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { cleanString } from '@/lib/validation';
import type { Role } from '@/generated/prisma/enums';

export const runtime = 'nodejs';

const COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

export async function GET() {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const statuses = await prisma.leadStatus.findMany({ orderBy: { sortOrder: 'asc' }, include: { _count: { select: { leads: true } } } });
  return NextResponse.json({ statuses });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(['SUPER_ADMIN', 'ADMIN'] as Role[]);
  if (isRedirect(auth)) return auth;

  let body: { name?: string; color?: string; sortOrder?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = cleanString(body.name, 100);
  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });

  const color = body.color && COLOR_REGEX.test(body.color) ? body.color : '#64748b';
  const maxOrder = await prisma.leadStatus.aggregate({ _max: { sortOrder: true } });

  const status = await prisma.leadStatus.create({
    data: { name, color, sortOrder: (maxOrder._max.sortOrder ?? 0) + 1 },
  });

  await prisma.activityLog.create({ data: { userId: auth.user.id, action: 'STATUS_CREATED', details: name } });
  return NextResponse.json({ status });
}