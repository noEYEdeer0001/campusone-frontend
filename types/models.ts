export type UserRole = 'STUDENT' | 'CLUB_ADMIN' | 'UNIVERSITY_ADMIN' | 'SUPER_ADMIN';

/**
 * The backend's login/register responses return this full sanitized
 * user object (see the Auth module's `toPublicUser`, which strips
 * `passwordHash`). This is the richest shape available and is used
 * whenever we have a fresh response body to read it from.
 */
export interface AuthUser {
  id: string;
  universityId: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  role: UserRole;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

/**
 * After a page reload, there is no fresh login response body to read
 * -- only the httpOnly cookie. There is also no `GET /users/me`
 * endpoint on the backend yet to re-fetch the full object from. So
 * the reload-bootstrap path (`GET /api/auth/me`) falls back to
 * decoding the access token's own claims (see lib/jwt.ts), which is
 * necessarily a smaller shape than AuthUser -- no `fullName`,
 * `avatarUrl`, etc., since those were never encoded into the JWT.
 * Once the backend's Users module ships a real profile endpoint,
 * `/api/auth/me` should call it instead and this type can be retired.
 */
export interface AuthUserClaims {
  id: string;
  email: string;
  role: UserRole;
  universityId: string;
  isEmailVerified: boolean;
}
