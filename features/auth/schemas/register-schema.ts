import { z } from 'zod';

/**
 * Mirrors the backend's password policy exactly (see the Auth
 * module's auth.validation.ts): min 8 chars, at least one uppercase,
 * one number, one special character. Duplicating this client-side
 * isn't redundant -- it gives instant feedback instead of a round
 * trip, but the backend re-validates independently regardless.
 */
const passwordSchema = z
  .string()
  .min(8, 'At least 8 characters')
  .regex(/[A-Z]/, 'At least one uppercase letter')
  .regex(/[0-9]/, 'At least one number')
  .regex(/[^A-Za-z0-9]/, 'At least one special character');

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Too short').max(80, 'Too long'),
    email: z.string().trim().toLowerCase().email('Enter a valid email address'),
    password: passwordSchema,
    confirmPassword: z.string(),
    universityId: z.string().uuid('This should be a valid University ID'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
