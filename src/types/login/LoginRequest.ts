import { z } from 'zod';
import { DeviceInformationSchema } from '../system/DeviceInformation';

export const LoginRequestSchema = z.object({
  username: z.string().optional(),
  password: z.string(),
  id: z.string(),
  uuid: z.string(),
  autoLogin: z.boolean().optional(),
  type: z.string().optional(),
  verificationCode: z.string().optional(),
  tfaCode: z.string().optional(),
  secret: z.string().optional(),
  deviceInfo: DeviceInformationSchema.optional(),
});

// Infer the TypeScript interface from the Zod schema
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
