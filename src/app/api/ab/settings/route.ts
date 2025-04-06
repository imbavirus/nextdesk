import { NextResponse } from 'next/server';

export async function POST(req : Request) {
    // const data = await req.json();
    console.log('TODO: HANDLE SETTINGS');
    return NextResponse.json({ status: 'ok'});
}
