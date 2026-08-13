import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/leads';
import { getClientIp, getDeviceInfo } from '@/lib/activity';
import { cleanString, cleanOptional, cleanEmail, cleanPhone } from '@/lib/validation';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

interface ContactPayload {
  fullName: string;
  email: string;
  country: string;
  phone: string;
  language: string;
  service: string;
  message: string;
  city?: string;
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const fullName = cleanString(payload.fullName, 200);
  const email = cleanEmail(payload.email);
  const country = cleanOptional(payload.country, 100);
  const city = cleanOptional(payload.city, 100);
  const phone = cleanPhone(payload.phone);
  const language = cleanOptional(payload.language, 50);
  const service = cleanOptional(payload.service, 200);
  const message = cleanOptional(payload.message, 5000);

  if (!fullName || !email || !country || !phone || !language || !service || !message) {
    return NextResponse.json({ error: 'All fields are required and must be valid.' }, { status: 400 });
  }

  const ip = getClientIp(request.headers);
  const ua = request.headers.get('user-agent') ?? '';
  const { device, browser } = getDeviceInfo(ua);

  try {
    const recent = await prisma.lead.count({
      where: {
        ...(ip !== 'unknown' ? { ipAddress: ip } : {}),
        createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
      },
    });
    if (recent >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }
  } catch {
    // rate limit must not block if DB is unavailable
  }

  let leadId: string | undefined;
  try {
    const lead = await createLead(
      {
        name: fullName,
        phone: phone ?? fullName,
        email,
        country,
        city,
        message,
        sourcePage: request.headers.get('referer') ?? undefined,
        formName: 'consultation-form',
        ipAddress: ip,
        deviceInfo: device,
        browserInfo: browser,
        customFields: {
          language,
          service,
          consent: true,
        },
      },
      ip
    );
    leadId = lead.id;
  } catch {
    // fall through to external delivery even if DB fails
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (accessKey) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New consultation request from ${fullName}`,
          from_name: 'Maulana Hafiz Ali Website',
          full_name: fullName,
          email,
          country,
          phone,
          preferred_language: language,
          service_required: service,
          message,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success && !leadId) {
        return NextResponse.json({ error: 'Submission delivery failed. Please try again.' }, { status: 502 });
      }
    } catch {
      if (!leadId) {
        return NextResponse.json({ error: 'Submission delivery failed. Please try again.' }, { status: 502 });
      }
    }
  }

  return NextResponse.json({ success: true, leadId });
}