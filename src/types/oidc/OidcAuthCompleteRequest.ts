import { z } from 'zod';

export const OidcAuthCompleteRequestSchema = z.object({
  email: z.string().email(),
  authCode: z.string(),
  provider: z.string(),
  systemId: z.string(),
  accessToken: z.string(),
});

export type OidcAuthCompleteRequest = z.infer<typeof OidcAuthCompleteRequestSchema>; 