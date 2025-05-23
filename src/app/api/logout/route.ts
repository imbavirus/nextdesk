//app/api/logout/route.ts
import { disableToken, getBearerToken } from '@/services/tokenService';
import { NextResponse } from 'next/server';

/**
 * @openapi
 * Logout user
 * @desc: Invalidate the current user's bearer token
 * @auth: bearer
 * @response: StatusResponse
 */
export async function POST(req : Request) {
    const bearerToken = getBearerToken(req);
    if (!!bearerToken) {
        await disableToken(bearerToken);
    }
    return NextResponse.json({ status: 'ok'});
};
