import { UserStatus } from './UserStatus';

export interface UserPayload {
    name : string;
    email : string;
    note : string;
    status : UserStatus;
    isAdmin : boolean;
};
