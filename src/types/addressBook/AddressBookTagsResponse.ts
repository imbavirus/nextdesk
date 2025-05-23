import { z } from 'zod';
import { AddressBookTagSchema } from './AddressBookTag';

export const AddressBookTagsResponseSchema = z.array(AddressBookTagSchema);

export type AddressBookTagsResponse = z.infer<typeof AddressBookTagsResponseSchema>; 