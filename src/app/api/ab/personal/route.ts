import { AddressBookProfile } from '@/model/addressBook/AddressBookProfile';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('TODO: HANDLE AB PERSONAL');
    return NextResponse.json({ status: 'ok'});
}

export async function POST(req : Request) {
    const data : AddressBookProfile = await req.json();
    console.log('TODO: HANDLE AB PERSONAL POST', data);
    return NextResponse.json({ status: 'ok'});
}
