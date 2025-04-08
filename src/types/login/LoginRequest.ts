import { DeviceInformation } from '../system/DeviceInformation';

export interface LoginRequest {
    username ?: string;
    password : string;
    id : string;
    uuid : string;
    autoLogin ?: boolean;
    type ?: string;
    verificationCode ?: string;
    tfaCode ?: string;
    secret ?: string;
    deviceInfo ?: DeviceInformation;
}
