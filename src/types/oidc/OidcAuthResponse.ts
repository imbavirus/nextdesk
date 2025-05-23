import { z } from 'zod';

export const OidcAuthResponseSchema = z.object({
  code: z.string(),
  url: z.string(),
});

export type OidcAuthResponse = z.infer<typeof OidcAuthResponseSchema>; 