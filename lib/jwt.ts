import type { AuthUserClaims } from '@/types/models';

/**
 * Decodes (does NOT verify) a JWT's payload. Verification is the
 * backend's job -- every protected Express endpoint independently
 * re-verifies the token's signature and expiry (see the Auth module's
 * `authenticate` middleware). This function exists purely so the
 * frontend can reconstruct minimal "who is logged in" state after a
 * page reload, without a `/users/me` endpoint that doesn't exist yet
 * on the backend. Never trust this decoded value for anything
 * security-sensitive -- it is for UI display only.
 */
export function decodeAccessTokenClaims(token: string): AuthUserClaims | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const decoded = JSON.parse(json) as Partial<AuthUserClaims> & { exp?: number };

    if (!decoded.id || !decoded.email || !decoded.role || !decoded.universityId) {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      universityId: decoded.universityId,
      isEmailVerified: Boolean(decoded.isEmailVerified),
    };
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const decoded = JSON.parse(json) as { exp?: number };
    if (!decoded.exp) return true;
    return decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}
