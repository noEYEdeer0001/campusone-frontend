import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { expressApi } from '@/lib/server/express-client';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/lib/server/cookies';

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (accessToken && refreshToken) {
    try {
      await expressApi.post(
        '/auth/logout',
        { refreshToken },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    } catch {
      // Best-effort: even if the backend call fails (e.g. the access
      // token already expired), we still clear local cookies below so
      // this device is logged out either way.
    }
  }

  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);
  return response;
}
