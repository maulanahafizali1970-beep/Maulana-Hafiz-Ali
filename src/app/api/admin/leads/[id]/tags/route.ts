import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  let body: { tagIds?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const tagIds = Array.isArray(body.tagIds) ? body.tagIds : [];
  await prisma.$transaction([
    prisma.leadTag.deleteMany({ where: { leadId: id } }),
    ...tagIds.map((tagId) => prisma.leadTag.create({ data: { leadId: id, tagId } })),
  ]);

  await prisma.activityLog.create({
    data: { userId: auth.user.id, leadId: id, action: 'TAGS_UPDATED', details: `Tags set to ${tagIds.length} tags` },
  });

  return NextResponse.json({ success: true });
}