import { z } from 'zod';

export const SystemInformationSchema = z.object({
  cpu: z.string(),
  hostname: z.string(),
  id: z.string(),
  memory: z.string(),
  os: z.string(),
  username: z.string(),
  uuid: z.string(),
  version: z.string(),
  lastSeen: z.coerce.date(),
});

// Infer the TypeScript interface from the Zod schema
export type SystemInformation = z.infer<typeof SystemInformationSchema>;
