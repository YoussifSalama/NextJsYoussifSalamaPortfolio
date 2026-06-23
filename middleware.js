import { NextResponse } from 'next/server';
import { verifySessionToken } from './lib/session';

const COOKIE = 'yp_admin';

// Guards the /admin pages (except the login screen) and attaches baseline
// security headers to every response. Write APIs do their own auth check
// too, so they stay protected even if this middleware is bypassed.
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get(COOKIE)?.value;
    const ok = await verifySessionToken(token);
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  const res = NextResponse.next();
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
};
