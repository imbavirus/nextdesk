import { AddressBookProfile } from '@/model/addressBook/AddressBookProfile';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('TODO: HANDLE AB');
    return NextResponse.json({ status: 'ok'});
}

export async function POST(req : Request) {
    const data : AddressBookProfile = await req.json();
    console.log('TODO: HANDLE AB POST', data, req.headers);
    return NextResponse.json({ status: 'ok'});
}
