import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { getLeadById } from '@/lib/leads';
import { logActivity } from '@/lib/activity';
import { cleanString, cleanOptional, cleanPhone } from '@/lib/validation';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
  return NextResponse.json({ lead });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;
  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if ('name' in body) data.name = cleanString(body.name, 200);
  if ('phone' in body) {
    const p = cleanPhone(body.phone);
    if (p) data.phone = p;
  }
  if ('email' in body) data.email = cleanOptional(body.email, 254);
  if ('country' in body) data.country = cleanOptional(body.country, 100);
  if ('city' in body) data.city = cleanOptional(body.city, 100);
  if ('message' in body) data.message = cleanOptional(body.message, 5000);
  if ('priority' in body && ['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(body.priority as string)) {
    data.priority = body.priority;
  }

  const lead = await prisma.lead.update({ where: { id }, data });
  await logActivity({ userId: auth.user.id, leadId: id, action: 'LEAD_UPDATED', details: 'Lead details updated' });
  return NextResponse.json({ lead });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;
  const { id } = await params;
  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

  await prisma.lead.update({ where: { id }, data: { deletedAt: new Date() } });
  await logActivity({ userId: auth.user.id, leadId: id, action: 'LEAD_DELETED', details: 'Lead moved to trash' });
  return NextResponse.json({ success: true });
}