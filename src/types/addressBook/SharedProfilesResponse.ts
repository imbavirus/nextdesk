import { z } from 'zod';
import { AddressBookProfileSchema } from './AddressBookProfile';

export const SharedProfilesResponseSchema = z.array(AddressBookProfileSchema);

export type SharedProfilesResponse = z.infer<typeof SharedProfilesResponseSchema>; 