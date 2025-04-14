import { z } from 'zod';

export enum UserStatus {
    unverified = -1,
    disabled = 0,
    normal = 1,
}

export const UserStatusSchema = z.nativeEnum(UserStatus);
