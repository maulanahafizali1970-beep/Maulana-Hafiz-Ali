import { NextResponse } from 'next/server';
import { getSessionUser, type SessionUser } from './auth';
import type { Role } from '@/generated/prisma/enums';

export async function requireAuth(roles?: Role[]): Promise<{ user: SessionUser } | NextResponse> {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  if (roles && !roles.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }
  return { user };
}

export function isRedirect(res: NextResponse | { user: SessionUser }): res is NextResponse {
  return res instanceof NextResponse;
}