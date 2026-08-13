import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { cleanString } from '@/lib/validation';
import type { Role } from '@/generated/prisma/enums';

export const runtime = 'nodejs';

const COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['SUPER_ADMIN', 'ADMIN'] as Role[]);
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  const existing = await prisma.leadStatus.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Status not found.' }, { status: 404 });

  let body: { name?: string; color?: string; sortOrder?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const data: { name?: string; color?: string; sortOrder?: number } = {};
  if ('name' in body) {
    const name = cleanString(body.name, 100);
    if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    data.name = name;
  }
  if ('color' in body && body.color && COLOR_REGEX.test(body.color)) data.color = body.color;
  if ('sortOrder' in body && typeof body.sortOrder === 'number') data.sortOrder = body.sortOrder;

  const status = await prisma.leadStatus.update({ where: { id }, data });
  await prisma.activityLog.create({ data: { userId: auth.user.id, action: 'STATUS_UPDATED', details: status.name } });
  return NextResponse.json({ status });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['SUPER_ADMIN', 'ADMIN'] as Role[]);
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  const existing = await prisma.leadStatus.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Status not found.' }, { status: 404 });
  if (existing.isSystem) {
    return NextResponse.json({ error: 'System statuses cannot be deleted.' }, { status: 400 });
  }

  const defaultStatus = await prisma.leadStatus.findFirst({
    where: { isDefault: true, id: { not: id } },
    orderBy: { sortOrder: 'asc' },
  });

  await prisma.$transaction(async (tx) => {
    await tx.lead.updateMany({ where: { statusId: id }, data: { statusId: defaultStatus?.id ?? null } });
    await tx.leadStatusHistory.updateMany({ where: { toStatusId: id }, data: { toStatusId: null } });
    await tx.leadStatus.delete({ where: { id } });
  });

  await prisma.activityLog.create({ data: { userId: auth.user.id, action: 'STATUS_DELETED', details: existing.name } });
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['SUPER_ADMIN', 'ADMIN'] as Role[]);
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  let body: { isDefault?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (body.isDefault === true) {
    await prisma.leadStatus.updateMany({ data: { isDefault: false } });
  }
  const status = await prisma.leadStatus.update({
    where: { id },
    data: { isDefault: body.isDefault === true },
  });
  return NextResponse.json({ status });
}