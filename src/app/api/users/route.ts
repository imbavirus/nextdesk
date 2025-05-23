//app/api/users/route.ts
import { NextResponse } from 'next/server';

/**
 * @openapi
 * Get all users
 * @desc: Retrieve all users in the system
 * @auth: bearer
 * @response: StatusResponse
 */
export async function GET() {
    console.log('TODO: HANDLE USERS');
    return NextResponse.json({ status: 'ok'});
}
