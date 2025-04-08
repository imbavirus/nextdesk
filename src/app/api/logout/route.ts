import { disableToken, getBearerToken } from '@/services/tokenService';
import { NextResponse } from 'next/server';

export async function POST(req : Request) {
    const bearerToken = getBearerToken(req);
    if (!!bearerToken) {
        await disableToken(bearerToken);
    }
    return NextResponse.json({ status: 'ok'});
};
