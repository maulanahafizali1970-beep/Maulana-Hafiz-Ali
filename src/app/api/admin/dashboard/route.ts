import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth, isRedirect } from '@/lib/auth-guard';

export const runtime = 'nodejs';

export async function GET() {
  const auth = await requireAuth();
  if (isRedirect(auth)) return auth;

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalLeads,
    todayLeads,
    weekLeads,
    monthLeads,
    statuses,
    statusCounts,
    leadSourceStats,
    recentLeads,
    dueFollowups,
    overdueFollowups,
    dailyTrend,
    monthlyTrend,
    userActivity,
    recentNotifications,
  ] = await Promise.all([
    prisma.lead.count({ where: { deletedAt: null } }),
    prisma.lead.count({ where: { deletedAt: null, createdAt: { gte: startOfDay } } }),
    prisma.lead.count({ where: { deletedAt: null, createdAt: { gte: startOfWeek } } }),
    prisma.lead.count({ where: { deletedAt: null, createdAt: { gte: startOfMonth } } }),
    prisma.leadStatus.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lead.groupBy({
      by: ['statusId'],
      where: { deletedAt: null, statusId: { not: null } },
      _count: { _all: true },
    }),
    prisma.lead.groupBy({
      by: ['sourcePage'],
      where: { deletedAt: null, sourcePage: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { sourcePage: 'desc' } },
      take: 10,
    }),
    prisma.lead.findMany({
      where: { deletedAt: null },
      include: { status: true, assignedTo: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.leadFollowup.findMany({
      where: { completed: false, dueAt: { lte: new Date(now.getTime() + 24 * 60 * 60 * 1000) } },
      include: { lead: { include: { status: true } }, user: { select: { name: true } } },
      orderBy: { dueAt: 'asc' },
      take: 15,
    }),
    prisma.leadFollowup.findMany({
      where: { completed: false, dueAt: { lt: now } },
      include: { lead: { include: { status: true } }, user: { select: { name: true } } },
      orderBy: { dueAt: 'asc' },
      take: 15,
    }),
    prisma.$queryRawUnsafe(
      `SELECT date_trunc('day', "createdAt")::date AS day, COUNT(*)::int AS count
       FROM "Lead" WHERE "deletedAt" IS NULL AND "createdAt" >= NOW() - INTERVAL '30 days'
       GROUP BY day ORDER BY day ASC`
    ) as Promise<{ day: Date; count: number }[]>,
    prisma.$queryRawUnsafe(
      `SELECT date_trunc('month', "createdAt")::date AS month, COUNT(*)::int AS count
       FROM "Lead" WHERE "deletedAt" IS NULL AND "createdAt" >= NOW() - INTERVAL '12 months'
       GROUP BY month ORDER BY month ASC`
    ) as Promise<{ month: Date; count: number }[]>,
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { assignedLeads: { where: { deletedAt: null } } },
        },
      },
      orderBy: { name: 'asc' },
    }),
    prisma.notification.findMany({
      where: { userId: auth.user.id, read: false },
      include: { lead: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
  ]);

  const statusBreakdown = statuses.map((s) => ({
    ...s,
    count: statusCounts.find((c) => c.statusId === s.id)?._count._all ?? 0,
  }));

  const pendingCount = statusBreakdown
    .filter((s) => /pending|new|follow.?up|interested/i.test(s.name))
    .reduce((sum, s) => sum + s.count, 0);

  const convertedCount = statusBreakdown
    .filter((s) => /convert|closed|won/i.test(s.name))
    .reduce((sum, s) => sum + s.count, 0);

  const lostCount = statusBreakdown
    .filter((s) => /not.?interested|lost|no.?response|closed/i.test(s.name))
    .reduce((sum, s) => sum + s.count, 0);

  return NextResponse.json({
    summary: {
      totalLeads,
      todayLeads,
      weekLeads,
      monthLeads,
      pendingLeads: pendingCount,
      convertedLeads: convertedCount,
      lostLeads: lostCount,
      dueFollowups: dueFollowups.length,
      overdueFollowups: overdueFollowups.length,
    },
    statusBreakdown,
    leadSourceStats,
    recentLeads,
    dueFollowups,
    overdueFollowups,
    dailyTrend,
    monthlyTrend,
    userActivity,
    recentNotifications,
  });
}