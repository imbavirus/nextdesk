import { z } from 'zod';
import { PeerSchema } from './Peer';

export const PeerResponseSchema = z.array(PeerSchema);

// Infer the TypeScript interface from the Zod schema
export type PeerResponse = z.infer<typeof PeerResponseSchema>;
