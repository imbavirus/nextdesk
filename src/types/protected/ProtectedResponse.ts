import { z } from 'zod';
import { DeviceInformationSchema } from '../system/DeviceInformation';

export const ProtectedResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    deviceInfo: DeviceInformationSchema.optional(),
    id: z.string(),
    uuid: z.string(),
  }).optional(),
});

export type ProtectedResponse = z.infer<typeof ProtectedResponseSchema>; 