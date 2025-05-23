import { z } from 'zod';

export const OidcQueryRequestSchema = z.object({
  code: z.string(),
});

export type OidcQueryRequest = z.infer<typeof OidcQueryRequestSchema>; 