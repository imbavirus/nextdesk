import { z } from 'zod';
import { UserPayloadSchema } from '../user/UserPayload';

export const LoginResponseSchema = z.object({
  access_token: z.string().optional(),
  type: z.string().optional(),
  tfa_type: z.string().optional(),
  secret: z.string().optional(),
  user: UserPayloadSchema.optional(),
});

// Infer the TypeScript interface from the Zod schema
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
