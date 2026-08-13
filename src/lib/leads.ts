import { prisma } from './db';
import { logActivity } from './activity';

export interface LeadCreateInput {
  name: string;
  phone: string;
  email?: string | null;
  country?: string | null;
  city?: string | null;
  message?: string | null;
  sourcePage?: string | null;
  formName?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  ipAddress?: string | null;
  deviceInfo?: string | null;
  browserInfo?: string | null;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  customFields?: Record<string, unknown> | null;
  tags?: string[];
}

export async function findDuplicateLead(phone: string, email?: string | null) {
  const normalizedPhone = phone.replace(/[^\d+]/g, '');
  const or: Record<string, unknown>[] = [{ phone: normalizedPhone }];
  if (email) {
    or.push({ email: email.toLowerCase() });
  }
  return prisma.lead.findFirst({
    where: { deletedAt: null, OR: or },
    include: { status: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createLead(input: LeadCreateInput, ipAddress?: string) {
  const defaultStatus = await prisma.leadStatus.findFirst({
    where: { isDefault: true },
    orderBy: { sortOrder: 'asc' },
  });

  const normalizedPhone = input.phone.replace(/[^\d+]/g, '');

  const lead = await prisma.lead.create({
    data: {
      name: input.name,
      phone: normalizedPhone,
      email: input.email ? input.email.toLowerCase() : null,
      country: input.country ?? null,
      city: input.city ?? null,
      message: input.message ?? null,
      sourcePage: input.sourcePage ?? null,
      formName: input.formName ?? null,
      utmSource: input.utmSource ?? null,
      utmMedium: input.utmMedium ?? null,
      utmCampaign: input.utmCampaign ?? null,
      utmTerm: input.utmTerm ?? null,
      utmContent: input.utmContent ?? null,
      ipAddress: input.ipAddress ?? null,
      deviceInfo: input.deviceInfo ?? null,
      browserInfo: input.browserInfo ?? null,
      priority: input.priority ?? 'MEDIUM',
      customFields: (input.customFields as object) ?? undefined,
      statusId: defaultStatus?.id ?? null,
      tags: input.tags?.length
        ? {
            create: input.tags.map((name) => ({
              tag: { connectOrCreate: { where: { name }, create: { name } } },
            })),
          }
        : undefined,
    },
    include: {
      status: true,
      tags: { include: { tag: true } },
    },
  });

  await prisma.leadStatusHistory.create({
    data: {
      leadId: lead.id,
      fromStatusId: null,
      toStatusId: defaultStatus?.id ?? null,
      note: 'Lead created',
    },
  });

  await logActivity({
    leadId: lead.id,
    action: 'LEAD_CREATED',
    details: `New lead ${lead.name}`,
    ipAddress,
  });

  return lead;
}

export async function getLeadById(id: string) {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      status: true,
      assignedTo: { select: { id: true, name: true, email: true, role: true } },
      tags: { include: { tag: true } },
      notes: { include: { user: { select: { id: true, name: true } } }, orderBy: { createdAt: 'desc' } },
      followups: { include: { user: { select: { id: true, name: true } } }, orderBy: { dueAt: 'desc' } },
      assignments: {
        include: {
          user: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
      histories: {
        include: {
          fromStatus: true,
          toStatus: true,
          changedBy: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
      activityLogs: { orderBy: { createdAt: 'desc' }, take: 50 },
    },
  });
}