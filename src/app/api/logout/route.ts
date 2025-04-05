import { LogoutRequest } from '@/model/logout/LogoutRequest';
import { NextResponse } from 'next/server';

export async function POST(req : Request) {
    const data : LogoutRequest = await req.json();
    console.log('TODO: HANDLE LOGOUT', data);
    return NextResponse.json({ status: 'ok'});
};
