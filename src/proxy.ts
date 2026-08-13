import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth-token';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_session')?.value;
    const valid = token ? await verifyAdminToken(token) : false;
    if (!valid) {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_session')?.value;
    const valid = token ? await verifyAdminToken(token) : false;
    if (valid) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};