//app/api/ab/route.ts
import { updateAddressBook } from '@/services/addressBookService';
import { unauthorizedResponse } from '@/services/loginService';
import { getBearerToken } from '@/services/tokenService';
import { AddressBookPost } from '@/types/addressBook/AddressBookPost';
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
