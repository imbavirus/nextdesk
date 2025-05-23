import { z } from 'zod';
import { DeviceInformationSchema } from '../system/DeviceInformation';

export const ProtectedRequestSchema = z.object({
  deviceInfo: DeviceInformationSchema.optional(),
  id: z.string(),
  op: z.string(),
  uuid: z.string(),
});

export type ProtectedRequest = z.infer<typeof ProtectedRequestSchema>; 