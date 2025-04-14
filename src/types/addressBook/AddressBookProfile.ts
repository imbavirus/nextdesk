import { z } from 'zod';

export const AddressBookProfileSchema = z.object({
  guid: z.string(),
  name: z.string(),
  owner: z.string(),
  note: z.string().optional(),
  rule: z.enum(['1', '2', '3']), // 1 = Read-Only, 2 = Read/Write, 3 = Full Control
});

// Infer the TypeScript interface from the Zod schema
export type AddressBookProfile = z.infer<typeof AddressBookProfileSchema>;
