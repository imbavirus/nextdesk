//app/api/ab/shared/profiles/route.ts
import { NextResponse } from 'next/server';

/**
 * @openapi
 * Get shared address book profiles
 * @desc: Retrieve all shared profiles for a user's address book
 * @auth: bearer
 * @response: SharedProfilesResponse
 */
export async function POST() {
    console.log('TODO: HANDLE PROFILES');
    return NextResponse.json({ status: 'ok'});
}
