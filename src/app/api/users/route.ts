import { NextResponse } from 'next/server';

export async function GET() {
    console.log('TODO: HANDLE USERS');
    return NextResponse.json({ status: 'ok'});
}
