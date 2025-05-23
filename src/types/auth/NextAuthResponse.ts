import { z } from 'zod';

export const NextAuthResponseSchema = z.object({
  error: z.string().optional(),
  status: z.number().optional(),
  ok: z.boolean().optional(),
  url: z.string().optional(),
});

export type NextAuthResponse = z.infer<typeof NextAuthResponseSchema>; 