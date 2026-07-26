import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  cookieOptions,
} from '@/lib/server/cookies';
import { refreshTokens } from '@/lib/server/refresh';
import { decodeAccessTokenClaims } from '@/lib/jwt';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false, message: 'No session to refresh', errors: [] }, { status: 401 });
  }

  const rotated = await refreshTokens(refreshToken);
  if (!rotated) {
    const response = NextResponse.json(
      { success: false, message: 'Session expired', errors: [] },
      { status: 401 },
    );
    response.cookies.delete(ACCESS_TOKEN_COOKIE);
    response.cookies.delete(REFRESH_TOKEN_COOKIE);
    return response;
  }

  const claims = decodeAccessTokenClaims(rotated.accessToken);
  const response = NextResponse.json({ success: true, message: 'Refreshed', data: { user: claims } });
  response.cookies.set(ACCESS_TOKEN_COOKIE, rotated.accessToken, cookieOptions(ACCESS_TOKEN_MAX_AGE));
  response.cookies.set(REFRESH_TOKEN_COOKIE, rotated.refreshToken, cookieOptions(REFRESH_TOKEN_MAX_AGE));
  return response;
}
