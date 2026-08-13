import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';

export const runtime = 'nodejs';

export async function GET() {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const notifications = await prisma.notification.findMany({
    where: { userId: auth.user.id },
    include: { lead: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' },
    take: 30,
  });
  return NextResponse.json({ notifications });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  let body: { id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (body.id) {
    await prisma.notification.updateMany({ where: { id: body.id, userId: auth.user.id }, data: { read: true } });
  } else {
    await prisma.notification.updateMany({ where: { userId: auth.user.id }, data: { read: true } });
  }
  return NextResponse.json({ success: true });
}