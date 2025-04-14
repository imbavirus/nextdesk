import { z } from 'zod';

export const HeartbeatSchema = z.object({
  id: z.string(),
  modified_at: z.number(),
  uuid: z.string(),
  ver: z.number(),
});

// Infer the TypeScript interface from the Zod schema
export type Heartbeat = z.infer<typeof HeartbeatSchema>;
