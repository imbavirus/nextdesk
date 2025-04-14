import { z } from 'zod';

export const LogoutRequestSchema = z.object({
  id: z.string().optional(),
  uuid: z.string().optional(),
});

// Infer the TypeScript interface from the Zod schema
export type LogoutRequest = z.infer<typeof LogoutRequestSchema>;
