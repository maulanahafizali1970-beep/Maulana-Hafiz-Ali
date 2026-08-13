import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';
import { asInt } from '@/lib/validation';
import type { Prisma } from '@/generated/prisma/client';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;

  const searchParams = request.nextUrl.searchParams;
  const page = asInt(searchParams.get('page'), 1);
  const pageSize = asInt(searchParams.get('pageSize'), 25, 1, 200);
  const search = searchParams.get('search')?.trim() ?? '';
  const statusId = searchParams.get('statusId') ?? '';
  const assigneeId = searchParams.get('assigneeId') ?? '';
  const country = searchParams.get('country') ?? '';
  const sourcePage = searchParams.get('sourcePage') ?? '';
  const priority = searchParams.get('priority') ?? '';
  const tagId = searchParams.get('tagId') ?? '';
  const dateFrom = searchParams.get('dateFrom') ?? '';
  const dateTo = searchParams.get('dateTo') ?? '';
  const assignedOnly = searchParams.get('assignedOnly') === 'true';
  const unassignedOnly = searchParams.get('unassignedOnly') === 'true';
  const trashed = searchParams.get('trashed') === 'true';
  const sortBy = searchParams.get('sortBy') ?? 'createdAt';
  const sortDir = searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc';

  const where: Prisma.LeadWhereInput = trashed ? { deletedAt: { not: null } } : { deletedAt: null };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search.replace(/[\s\-()]/g, '') } },
      { email: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
      { message: { contains: search, mode: 'insensitive' } },
      { leadNo: { equals: parseInt(search, 10) || -1 } },
    ];
  }
  if (statusId) where.statusId = statusId;
  if (assigneeId) where.assignedToId = assigneeId;
  if (country) where.country = { equals: country, mode: 'insensitive' };
  if (sourcePage) where.sourcePage = { contains: sourcePage, mode: 'insensitive' };
  if (priority) where.priority = priority as never;
  if (tagId) where.tags = { some: { tagId } };
  if (assignedOnly) where.assignedToId = { not: null };
  if (unassignedOnly) where.assignedToId = null;
  if (dateFrom) where.createdAt = { ...(where.createdAt as object), gte: new Date(dateFrom) };
  if (dateTo) {
    const end = new Date(dateTo);
    end.setHours(23, 59, 59, 999);
    where.createdAt = { ...(where.createdAt as object), lte: end };
  }

  const validSorts: Record<string, Prisma.LeadOrderByWithRelationInput> = {
    createdAt: { createdAt: sortDir },
    updatedAt: { updatedAt: sortDir },
    name: { name: sortDir },
    leadNo: { leadNo: sortDir },
    status: { status: { sortOrder: sortDir } },
    assignedTo: { assignedTo: { name: sortDir } },
    priority: { priority: sortDir },
  };
  const orderBy = validSorts[sortBy] ?? validSorts.createdAt;

  const [total, leads, countries, assignees, statuses, sourcePages] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.findMany({
      where,
      include: {
        status: true,
        assignedTo: { select: { id: true, name: true } },
        tags: { include: { tag: true } },
        followups: { where: { completed: false }, select: { id: true, dueAt: true }, orderBy: { dueAt: 'asc' }, take: 1 },
      },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.lead.findMany({
      where: { deletedAt: null, country: { not: null } },
      select: { country: true },
      distinct: ['country'],
      orderBy: { country: 'asc' },
    }),
    prisma.user.findMany({
      where: { active: true },
      select: { id: true, name: true, role: true },
      orderBy: { name: 'asc' },
    }),
    prisma.leadStatus.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lead.findMany({
      where: { deletedAt: null, sourcePage: { not: null } },
      select: { sourcePage: true },
      distinct: ['sourcePage'],
      orderBy: { sourcePage: 'asc' },
    }),
  ]);

  const assigneeCounts = await prisma.lead.groupBy({
    by: ['assignedToId'],
    where: { deletedAt: null, assignedToId: { not: null } },
    _count: { _all: true },
  });

  if (trashed) {
    const leads = await prisma.lead.findMany({
      where,
      orderBy: { deletedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const total = await prisma.lead.count({ where });
    return NextResponse.json({
      leads,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      filters: { countries: [], sourcePages: [], assignees: [], statuses: [], assigneeCounts: [] },
    });
  }

  return NextResponse.json({
    leads,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    filters: {
      countries: countries.map((c) => c.country).filter(Boolean),
      sourcePages: sourcePages.map((s) => s.sourcePage).filter(Boolean),
      assignees: assignees,
      statuses,
      assigneeCounts: assigneeCounts.map((a) => ({ assigneeId: a.assignedToId, count: a._count._all })),
    },
  });
}