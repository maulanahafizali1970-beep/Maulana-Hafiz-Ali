import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const out: Record<string, unknown> = {};
  try {
    const { prisma } = await import('@/lib/db');
    const u = await prisma.user.count();
    out.dbCount = u;
  } catch (e) {
    out.dbError = e instanceof Error ? e.message : String(e);
    out.dbStack = e instanceof Error ? (e.stack ?? '').split('\n').slice(0, 6).join('\n') : '';
  }
  const url = process.env.DATABASE_URL ?? '';
  out.dbHost = url.replace(/^[^@]*@/, '');
  out.jwtLen = (process.env.JWT_SECRET ?? '').length;
  return NextResponse.json(out);
}
