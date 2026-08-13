import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { cleanString } from '@/lib/validation';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  let body: { name?: string; color?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const data: { name?: string; color?: string } = {};
  if ('name' in body) {
    const name = cleanString(body.name, 100);
    if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    data.name = name;
  }
  if ('color' in body && body.color && /^#[0-9a-fA-F]{6}$/.test(body.color)) data.color = body.color;

  try {
    const tag = await prisma.tag.update({ where: { id }, data });
    return NextResponse.json({ tag });
  } catch {
    return NextResponse.json({ error: 'Tag with this name already exists.' }, { status: 409 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;
  await prisma.tag.delete({ where: { id } });
  return NextResponse.json({ success: true });
}