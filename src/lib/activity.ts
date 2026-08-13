import { prisma } from './db';

export async function logActivity(opts: {
  userId?: string | null;
  leadId?: string | null;
  action: string;
  details?: string | null;
  ipAddress?: string | null;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        userId: opts.userId ?? null,
        leadId: opts.leadId ?? null,
        action: opts.action,
        details: opts.details ?? null,
        ipAddress: opts.ipAddress ?? null,
      },
    });
  } catch {
    // logging must never break the main flow
  }
}

export function getClientIp(headers: Headers): string {
  const xf = headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

export function getDeviceInfo(userAgent: string): { device: string; browser: string } {
  const ua = userAgent ?? '';
  let device = 'Unknown';
  let browser = 'Unknown';
  if (/iPhone/i.test(ua)) device = 'iPhone';
  else if (/iPad/i.test(ua)) device = 'iPad';
  else if (/Android/i.test(ua)) device = 'Android';
  else if (/Windows/i.test(ua)) device = 'Windows';
  else if (/Macintosh|Mac OS/i.test(ua)) device = 'Mac';
  else if (/Linux/i.test(ua)) device = 'Linux';

  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua)) browser = 'Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua)) browser = 'Safari';

  return { device, browser };
}