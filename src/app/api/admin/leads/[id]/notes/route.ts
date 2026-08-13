import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { cleanString } from '@/lib/validation';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;

  let body: { content?: string; kind?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const content = cleanString(body.content, 5000);
  if (!content) return NextResponse.json({ error: 'Note content is required.' }, { status: 400 });

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

  const kind = ['note', 'call_note', 'email', 'whatsapp'].includes(body.kind ?? '') ? body.kind! : 'note';

  const note = await prisma.leadNote.create({
    data: { leadId: id, userId: auth.user.id, content, kind },
    include: { user: { select: { id: true, name: true } } },
  });

  await prisma.activityLog.create({
    data: { userId: auth.user.id, leadId: id, action: 'NOTE_ADDED', details: `${kind} note` },
  });

  return NextResponse.json({ note });
}

export async function GET(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;
  const notes = await prisma.leadNote.findMany({
    where: { leadId: id },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ notes });
}