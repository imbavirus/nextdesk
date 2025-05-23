import { z } from 'zod';

export const PeerParamsSchema = z.object({
    current: z.string().transform(Number),
    pageSize: z.string().transform(Number),
    ab: z.string().optional(),
  });

// Infer the TypeScript interface from the Zod schema
export type PeerParams = z.infer<typeof PeerParamsSchema>;
