import { updateAddressBook } from '@/app/manager/addressBookManager';
import { unauthorizedResponse } from '@/app/manager/loginManager';
import { getBearerToken } from '@/app/manager/tokenManager';
import { AddressBookPost } from '@/model/addressBook/AddressBookPost';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('TODO: HANDLE AB');
    return NextResponse.json({ status: 'ok'});
}

export async function POST(req : Request) {
    const dataString : { data : string } = await req.json();
    const data : AddressBookPost = JSON.parse(dataString.data);
    data.tagColors = JSON.parse(data.tag_colors);
    const token = getBearerToken(req);
    if (token === null) {
        return unauthorizedResponse('Unauthorized');
    }
    await updateAddressBook(data, token);
    console.log('TODO: HANDLE AB POST', data, req.headers);
    return NextResponse.json({ status: 'ok'});
}
