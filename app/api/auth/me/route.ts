import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeAccessTokenClaims, isTokenExpired } from '@/lib/jwt';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  cookieOptions,
} from '@/lib/server/cookies';
import { refreshTokens } from '@/lib/server/refresh';

/**
 * This is the "auto login after refresh" mechanism: on every app
 * load, the client calls this route once. It reads the httpOnly
 * cookies (invisible to client JS, which is the point) and either:
 *   1. the access token is still valid -> decode + return its claims
 *   2. the access token expired but a refresh token exists -> rotate
 *      it via the backend's own refresh endpoint, set the new
 *      cookies, and return the new claims
 *   3. neither is usable -> 401, clear cookies, client shows logged-out UI
 *
 * See types/models.ts's AuthUserClaims comment for why this returns
 * claims decoded from the JWT rather than a full profile fetch --
 * there is no `GET /users/me` on the backend yet.
 */
export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (accessToken && !isTokenExpired(accessToken)) {
    const claims = decodeAccessTokenClaims(accessToken);
    if (claims) {
      return NextResponse.json({ success: true, message: 'OK', data: { user: claims } });
    }
  }

  if (refreshToken) {
    const rotated = await refreshTokens(refreshToken);
    if (rotated) {
      const claims = decodeAccessTokenClaims(rotated.accessToken);
      if (claims) {
        const response = NextResponse.json({ success: true, message: 'OK', data: { user: claims } });
        response.cookies.set(ACCESS_TOKEN_COOKIE, rotated.accessToken, cookieOptions(ACCESS_TOKEN_MAX_AGE));
        response.cookies.set(
          REFRESH_TOKEN_COOKIE,
          rotated.refreshToken,
          cookieOptions(REFRESH_TOKEN_MAX_AGE),
        );
        return response;
      }
    }
  }

  const response = NextResponse.json(
    { success: false, message: 'Not authenticated', errors: [] },
    { status: 401 },
  );
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);
  return response;
}
