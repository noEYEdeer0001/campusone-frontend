import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { REFRESH_TOKEN_COOKIE } from '@/lib/server/cookies';

const PROTECTED_PREFIXES = ['/dashboard'];
const AUTH_PAGES = ['/login', '/register'];

/**
 * Checks for the REFRESH token, not the access token. The access
 * token is deliberately short-lived (15m) and will routinely be
 * expired-but-refreshable; gating navigation on it would log
 * legitimate users out of page loads constantly. The refresh token
 * (30d) is the real "is there a session at all" signal -- actually
 * validating it (rotation, revocation) happens server-side in
 * `/api/auth/me`, which every protected layout calls on mount. This
 * middleware is a fast, approximate gate to avoid flashing protected
 * UI before that real check resolves, not the final authority.
 */
export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(REFRESH_TOKEN_COOKIE)?.value);
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (isProtected && !hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
