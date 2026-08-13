import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { logActivity } from '@/lib/activity';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;

  let body: {
    leadIds?: string[];
    action?: 'status' | 'assign' | 'delete' | 'tag' | 'restore';
    statusId?: string;
    userId?: string;
    tagIds?: string[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const leadIds = Array.isArray(body.leadIds) ? body.leadIds : [];
  if (leadIds.length === 0) return NextResponse.json({ error: 'No leads selected.' }, { status: 400 });

  switch (body.action) {
    case 'status': {
      if (!body.statusId) return NextResponse.json({ error: 'statusId required.' }, { status: 400 });
      const status = await prisma.leadStatus.findUnique({ where: { id: body.statusId } });
      if (!status) return NextResponse.json({ error: 'Status not found.' }, { status: 404 });
      await prisma.lead.updateMany({ where: { id: { in: leadIds } }, data: { statusId: body.statusId } });
      await prisma.leadStatusHistory.createMany({
        data: leadIds.map((leadId) => ({
          leadId,
          toStatusId: body.statusId,
          changedById: auth.user.id,
          note: 'Bulk status update',
        })),
      });
      await logActivity({ userId: auth.user.id, action: 'BULK_STATUS', details: `${leadIds.length} leads -> ${status.name}` });
      break;
    }
    case 'assign': {
      if (!body.userId) return NextResponse.json({ error: 'userId required.' }, { status: 400 });
      const target = await prisma.user.findUnique({ where: { id: body.userId } });
      if (!target || !target.active) return NextResponse.json({ error: 'User not found.' }, { status: 404 });
      await prisma.lead.updateMany({ where: { id: { in: leadIds } }, data: { assignedToId: body.userId } });
      await prisma.leadAssignment.createMany({
        data: leadIds.map((leadId) => ({ leadId, userId: body.userId!, assignedBy: auth.user.id, note: 'Bulk assignment' })),
      });
      await prisma.notification.create({
        data: {
          userId: body.userId,
          type: 'assignment',
          title: `${leadIds.length} leads assigned to you`,
        },
      });
      await logActivity({ userId: auth.user.id, action: 'BULK_ASSIGN', details: `${leadIds.length} leads -> ${target.name}` });
      break;
    }
    case 'delete': {
      await prisma.lead.updateMany({ where: { id: { in: leadIds } }, data: { deletedAt: new Date() } });
      await logActivity({ userId: auth.user.id, action: 'BULK_DELETE', details: `${leadIds.length} leads moved to trash` });
      break;
    }
    case 'restore': {
      await prisma.lead.updateMany({ where: { id: { in: leadIds } }, data: { deletedAt: null } });
      await logActivity({ userId: auth.user.id, action: 'BULK_RESTORE', details: `${leadIds.length} leads restored` });
      break;
    }
    case 'tag': {
      const tagIds = Array.isArray(body.tagIds) ? body.tagIds : [];
      if (tagIds.length === 0) return NextResponse.json({ error: 'tagIds required.' }, { status: 400 });
      await prisma.leadTag.createMany({
        data: leadIds.flatMap((leadId) => tagIds.map((tagId) => ({ leadId, tagId }))),
        skipDuplicates: true,
      });
      await logActivity({ userId: auth.user.id, action: 'BULK_TAG', details: `${leadIds.length} leads tagged` });
      break;
    }
    default:
      return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}