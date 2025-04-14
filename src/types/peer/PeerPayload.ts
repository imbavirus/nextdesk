import { z } from 'zod';

export const PeerPayloadSchema = z.object({
  id: z.string(),
  info: z.record(z.union([z.string(), z.number()])),
  status: z.number().optional(),
  user: z.string(),
  user_name: z.string(),
  device_group_name: z.string().optional(),
  note: z.string(),
});

// Infer the TypeScript interface from the Zod schema
export type PeerPayload = z.infer<typeof PeerPayloadSchema>;
