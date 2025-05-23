import { z } from 'zod';
import { StatusResponseSchema } from '../common/StatusResponse';

export const AddressBookResponseSchema = StatusResponseSchema;

export type AddressBookResponse = z.infer<typeof AddressBookResponseSchema>; 