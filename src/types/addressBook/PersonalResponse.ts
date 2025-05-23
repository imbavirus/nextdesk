import { z } from 'zod';

export const PersonalResponseSchema = z.object({
  guid: z.string(),
});

export type PersonalResponse = z.infer<typeof PersonalResponseSchema>; 