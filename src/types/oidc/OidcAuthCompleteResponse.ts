import { z } from 'zod';
import { UserPayloadSchema } from '../user/UserPayload';

export const OidcAuthCompleteResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    user_info: UserPayloadSchema,
    accessToken: z.string(),
    type: z.string(),
  }).optional(),
  error: z.string().optional(),
});

export type OidcAuthCompleteResponse = z.infer<typeof OidcAuthCompleteResponseSchema>; 