import { z } from 'zod';

export const StatusResponseSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
});

export type StatusResponse = z.infer<typeof StatusResponseSchema>; 