import { UserPayload } from '../user/UserPayload';

export interface LoginResponse {
    access_token ?: string;
    type ?: string;
    tfa_type ?: string;
    secret ?: string;
    user ?: UserPayload;
}
