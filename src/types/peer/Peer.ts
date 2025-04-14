import { z } from 'zod';

export const PeerSchema = z.object({
    id: z.string(),
    username: z.string(),
    hostname: z.string(),
    platform: z.string(),
    alias: z.string(),
    tags: z.array(z.string()),
    hash: z.string(),
  });

// Infer the TypeScript interface from the Zod schema
export type Peer = z.infer<typeof PeerSchema>;
