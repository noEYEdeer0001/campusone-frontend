import { expressApi } from '@/lib/server/express-client';

export async function refreshTokens(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const res = await expressApi.post('/auth/refresh-token', { refreshToken });
    return res.data.data as { accessToken: string; refreshToken: string };
  } catch {
    return null;
  }
}
