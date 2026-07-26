export const ACCESS_TOKEN_COOKIE = 'co_access_token';
export const REFRESH_TOKEN_COOKIE = 'co_refresh_token';

/**
 * `httpOnly` is the whole reason these route handlers exist instead
 * of the client storing tokens directly: JavaScript (including an
 * XSS payload injected anywhere else in the app) cannot read these
 * cookies. `sameSite: lax` allows the cookie on top-level navigation
 * (e.g. following an email verification link) while still blocking
 * cross-site POST/PUT forgery. `secure` is left conditional on
 * production since local development over plain HTTP would otherwise
 * silently drop the cookie.
 */
export function cookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15m, matches the backend's JWT_ACCESS_EXPIRES_IN
export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30d, matches JWT_REFRESH_EXPIRES_IN
