import { z } from 'zod';

export const AddressBookTagSchema = z.object({
  name: z.string(),
  color: z.number(),
});

// Infer the TypeScript interface from the Zod schema
export type AddressBookTag = z.infer<typeof AddressBookTagSchema>;
