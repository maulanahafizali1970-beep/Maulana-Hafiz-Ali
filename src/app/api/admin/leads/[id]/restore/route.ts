import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function POST(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

  const restored = await prisma.lead.update({ where: { id }, data: { deletedAt: null } });
  await prisma.activityLog.create({
    data: { userId: auth.user.id, leadId: id, action: 'LEAD_RESTORED', details: 'Lead restored from trash' },
  });
  return NextResponse.json({ lead: restored });
}