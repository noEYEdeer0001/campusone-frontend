import { NextResponse } from 'next/server';
import { expressApi, toApiRequestError } from '@/lib/server/express-client';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const res = await expressApi.post('/auth/register', body);
    return NextResponse.json(res.data, { status: 201 });
  } catch (error) {
    const apiError = toApiRequestError(error);
    return NextResponse.json(
      { success: false, message: apiError.message, errors: apiError.errors },
      { status: apiError.statusCode || 500 },
    );
  }
}
