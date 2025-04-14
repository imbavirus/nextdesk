import { z } from 'zod';

// Assuming DeviceInformation is already defined as a Zod schema elsewhere
export const DeviceInformationSchema = z.object({
  os: z.string().optional(),
  type: z.string().optional(),
  name: z.string().optional(),
});
