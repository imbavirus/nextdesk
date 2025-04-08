export interface AddressBookProfile {
    guid : string;
    name : string;
    owner : string;
    note ?: string;
    rule : number; // 1 = Read-Only, 2 = Read/Write, 3 = Full Control
}
