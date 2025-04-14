import { z } from 'zod';
import { PeerSchema } from '../peer/Peer';

export const AddressBookPostSchema = z.object({
  tags: z.array(z.string()),
  peers: z.array(PeerSchema),
  tag_colors: z.string(),
  tagColors: z.record(z.string(), z.number()),
});

// Infer the TypeScript interface from the Zod schema
export type AddressBookPost = z.infer<typeof AddressBookPostSchema>;
