import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface ContactPayload {
  fullName: string;
  email: string;
  country: string;
  phone: string;
  language: string;
  service: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const fullName = payload.fullName?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const country = payload.country?.trim() ?? '';
  const phone = payload.phone?.trim() ?? '';
  const language = payload.language?.trim() ?? '';
  const service = payload.service?.trim() ?? '';
  const message = payload.message?.trim() ?? '';

  if (!fullName || !email || !isValidEmail(email) || !country || !phone || !language || !service || !message) {
    return NextResponse.json({ error: 'All fields are required and must be valid.' }, { status: 400 });
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
      if (!res.ok || !result.success) {
        return NextResponse.json({ error: 'Submission delivery failed. Please try again.' }, { status: 502 });
      }
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ error: 'Submission delivery failed. Please try again.' }, { status: 502 });
    }
  }

  const submission = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    fullName,
    email,
    country,
    phone,
    language,
    service,
    message,
  };

  const fs = await import('node:fs');
  const path = await import('node:path');
  const dir = '/tmp';
  const file = path.join(dir, 'contact-submissions.jsonl');
  try {
    fs.appendFileSync(file, JSON.stringify(submission) + '\n');
  } catch {
    // ignore write failures, response still succeeds
  }

  return NextResponse.json({ success: true });
}
