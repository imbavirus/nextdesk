import { Peer } from '../peer/Peer';

export interface AddressBookPost {
    tags : string[];
    peers : Peer[];
    tag_colors : string;
    tagColors : { [key : string] : number };
}
