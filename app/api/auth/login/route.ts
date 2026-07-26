import { NextResponse } from 'next/server';
import { expressApi, toApiRequestError } from '@/lib/server/express-client';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  cookieOptions,
} from '@/lib/server/cookies';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const res = await expressApi.post('/auth/login', body);
    const { user, accessToken, refreshToken } = res.data.data as {
      user: unknown;
      accessToken: string;
      refreshToken: string;
    };

    const response = NextResponse.json({ success: true, message: 'Login successful', data: { user } });
    response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, cookieOptions(ACCESS_TOKEN_MAX_AGE));
    response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, cookieOptions(REFRESH_TOKEN_MAX_AGE));
    return response;
  } catch (error) {
    const apiError = toApiRequestError(error);
    return NextResponse.json(
      { success: false, message: apiError.message, errors: apiError.errors },
      { status: apiError.statusCode || 500 },
    );
  }
}
