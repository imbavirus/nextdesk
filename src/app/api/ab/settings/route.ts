//app/api/ab/settings/route.ts
import { NextResponse } from 'next/server';

/**
 * @openapi
 * Update address book settings
 * @desc: Update settings for a user's address book
 * @auth: bearer
 * @response: StatusResponse
 */
export async function POST() {
    // const data = await req.json();
    console.log('TODO: HANDLE SETTINGS');
    return NextResponse.json({ status: 'ok'});
}
