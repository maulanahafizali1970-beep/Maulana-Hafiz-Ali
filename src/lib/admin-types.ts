export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'AGENT';
}

export interface LeadStatus {
  id: string;
  name: string;
  color: string;
  sortOrder: number;
  isDefault: boolean;
  isSystem: boolean;
  _count?: { leads: number };
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  _count?: { leads: number };
}

export interface Lead {
  id: string;
  leadNo: number;
  name: string;
  phone: string;
  email: string | null;
  country: string | null;
  city: string | null;
  message: string | null;
  sourcePage: string | null;
  formName: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  ipAddress: string | null;
  deviceInfo: string | null;
  browserInfo: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  customFields: Record<string, unknown> | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus | null;
  statusId?: string | null;
  assignedToId?: string | null;
  assignedTo?: { id: string; name: string } | null;
  tags?: { tag: Tag }[];
  followups?: { id: string; dueAt: string; note?: string | null; completed?: boolean }[];
  notes?: { id: string; content: string; kind: string; createdAt: string; user: { name: string } }[];
  histories?: {
    id: string;
    fromStatus: LeadStatus | null;
    toStatus: LeadStatus | null;
    changedBy: { name: string } | null;
    note: string | null;
    createdAt: string;
  }[];
  assignments?: { id: string; user: { name: string }; note: string | null; createdAt: string }[];
  activityLogs?: { id: string; action: string; details: string | null; createdAt: string }[];
}

export interface DashboardData {
  summary: {
    totalLeads: number;
    todayLeads: number;
    weekLeads: number;
    monthLeads: number;
    pendingLeads: number;
    convertedLeads: number;
    lostLeads: number;
    dueFollowups: number;
    overdueFollowups: number;
  };
  statusBreakdown: (LeadStatus & { count: number })[];
  leadSourceStats: { sourcePage: string | null; _count: { _all: number } }[];
  recentLeads: Lead[];
  dueFollowups: { id: string; dueAt: string; note: string | null; lead: Lead; user: { name: string } | null }[];
  overdueFollowups: { id: string; dueAt: string; note: string | null; lead: Lead; user: { name: string } | null }[];
  dailyTrend: { day: string; count: number }[];
  monthlyTrend: { month: string; count: number }[];
  userActivity: { id: string; name: string; _count: { assignedLeads: number } }[];
  recentNotifications: { id: string; type: string; title: string; message: string | null; read: boolean; createdAt: string; lead: { id: string; name: string } | null }[];
}

export interface LeadListResponse {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: {
    countries: string[];
    sourcePages: string[];
    assignees: { id: string; name: string; role: string }[];
    statuses: LeadStatus[];
    assigneeCounts: { assigneeId: string | null; count: number }[];
  };
}