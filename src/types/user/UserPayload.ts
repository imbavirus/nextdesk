import { z } from 'zod';
import { UserStatusSchema } from './UserStatus';

export const UserPayloadSchema = z.object({
  name: z.string(),
  email: z.string(),
  note: z.string(),
  status: UserStatusSchema,
  isAdmin: z.boolean(),
});

// Infer the TypeScript interface from the Zod schema
export type UserPayload = z.infer<typeof UserPayloadSchema>;
