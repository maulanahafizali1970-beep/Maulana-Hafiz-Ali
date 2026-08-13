import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { cleanString, cleanEmail } from '@/lib/validation';
import type { Role } from '@/generated/prisma/enums';

export const runtime = 'nodejs';

const ROLES: Role[] = ['SUPER_ADMIN', 'ADMIN', 'AGENT'];

export async function GET() {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
      _count: { select: { assignedLeads: true } },
    },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(['SUPER_ADMIN', 'ADMIN'] as Role[]);
  if (isRedirect(auth)) return auth;

  let body: { name?: string; email?: string; password?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = cleanString(body.name, 100);
  const email = cleanEmail(body.email);
  const password = cleanString(body.password, 200);
  const role = ROLES.includes(body.role as Role) ? (body.role as Role) : 'AGENT';

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
    select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
  });

  await prisma.activityLog.create({ data: { userId: auth.user.id, action: 'USER_CREATED', details: email } });
  return NextResponse.json({ user });
}