import { z } from 'zod';

export const LoginOptionsResponseSchema = z.array(z.string());

export type LoginOptionsResponse = z.infer<typeof LoginOptionsResponseSchema>; 