//app/api/peers/route.ts
import { NextResponse } from 'next/server';

/**
 * @openapi
 * Get all peers
 * @desc: Retrieve all peers in the system
 * @auth: bearer
 * @response: StatusResponse
 */
export async function GET() {
    console.log('TODO: HANDLE PEERS');
    return NextResponse.json({ status: 'ok'});
}
