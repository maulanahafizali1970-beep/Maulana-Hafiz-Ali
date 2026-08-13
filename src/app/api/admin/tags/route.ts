import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { cleanString } from '@/lib/validation';

export const runtime = 'nodejs';

const COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

export async function GET() {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { leads: true } } },
  });
  return NextResponse.json({ tags });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;

  let body: { name?: string; color?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = cleanString(body.name, 100);
  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });

  const color = body.color && COLOR_REGEX.test(body.color) ? body.color : '#64748b';

  try {
    const tag = await prisma.tag.create({ data: { name, color } });
    return NextResponse.json({ tag });
  } catch {
    return NextResponse.json({ error: 'Tag with this name already exists.' }, { status: 409 });
  }
}