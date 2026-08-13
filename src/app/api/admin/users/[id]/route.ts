import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { cleanString, cleanEmail } from '@/lib/validation';
import type { Role } from '@/generated/prisma/enums';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['SUPER_ADMIN', 'ADMIN'] as Role[]);
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

  let body: { name?: string; email?: string; password?: string; role?: string; active?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const data: { name?: string; email?: string; passwordHash?: string; role?: Role; active?: boolean } = {};

  if ('name' in body) {
    const name = cleanString(body.name, 100);
    if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    data.name = name;
  }
  if ('email' in body) {
    const email = cleanEmail(body.email);
    if (!email) return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    const dup = await prisma.user.findUnique({ where: { email } });
    if (dup && dup.id !== id) return NextResponse.json({ error: 'Email already in use.' }, { status: 409 });
    data.email = email;
  }
  if ('password' in body && body.password) {
    const password = cleanString(body.password, 200);
    if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    data.passwordHash = await bcrypt.hash(password, 12);
  }
  if ('role' in body && ['SUPER_ADMIN', 'ADMIN', 'AGENT'].includes(body.role as string)) {
    data.role = body.role as Role;
  }
  if ('active' in body && typeof body.active === 'boolean') data.active = body.active;

  const user = await prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
  });
  return NextResponse.json({ user });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth(['SUPER_ADMIN'] as Role[]);
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  if (id === auth.user.id) {
    return NextResponse.json({ error: 'You cannot delete your own account.' }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.lead.updateMany({ where: { assignedToId: id }, data: { assignedToId: null } }),
    prisma.user.delete({ where: { id } }),
  ]);
  return NextResponse.json({ success: true });
}