//app/api/device-group/accessible/route.ts

import { NextResponse } from 'next/server';

/**
 * @openapi
 * Get accessible device groups
 * @desc: Retrieve all device groups accessible to the user
 * @auth: bearer
 * @response: StatusResponse
 */
export async function GET() {
    console.log('TODO: HANDLE DEVICE GROUP');
    return NextResponse.json({ status: 'ok'});
}
