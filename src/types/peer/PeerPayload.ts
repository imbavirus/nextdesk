export interface PeerPayload {
    id : string;
    info : { [key : string] : string | number };
    status ?: number;
    user : string;
    user_name : string;
    device_group_name ?: string;
    note : string;
}
