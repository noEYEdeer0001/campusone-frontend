import { apiClient } from '@/services/api-client';
import type { ApiSuccessEnvelope } from '@/types/api';
import type { AuthUser, AuthUserClaims } from '@/types/models';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  universityId: string;
}

export const authService = {
  async register(payload: RegisterPayload): Promise<{ user: AuthUser }> {
    const res = await apiClient.post<ApiSuccessEnvelope<{ user: AuthUser }>>(
      '/auth/register',
      payload,
    );
    return res.data.data;
  },

  async login(payload: LoginPayload): Promise<{ user: AuthUser }> {
    const res = await apiClient.post<ApiSuccessEnvelope<{ user: AuthUser }>>('/auth/login', payload);
    return res.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  /** Bootstrap call -- see app/api/auth/me/route.ts for what this actually does. */
  async me(): Promise<{ user: AuthUserClaims }> {
    const res = await apiClient.get<ApiSuccessEnvelope<{ user: AuthUserClaims }>>('/auth/me');
    return res.data.data;
  },
};
