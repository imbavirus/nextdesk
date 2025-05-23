import { z } from 'zod';

export const OidcAuthRequestSchema = z.object({
  id: z.string(),
  op: z.string(),
  uuid: z.string(),
});

export type OidcAuthRequest = z.infer<typeof OidcAuthRequestSchema>; 