import { z } from 'zod';

export const OidcAuthQueryRequestSchema = z.object({
  code: z.string(),
  id: z.string(),
  uuid: z.string(),
});

export type OidcAuthQueryRequest = z.infer<typeof OidcAuthQueryRequestSchema>; 