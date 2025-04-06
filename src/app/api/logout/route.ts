import { disableToken, getBearerToken } from '@/app/manager/tokenManager';
import { NextResponse } from 'next/server';

export async function POST(req : Request) {
    const bearerToken = getBearerToken(req);
    if (!!bearerToken) {
        await disableToken(bearerToken);
    }
    return NextResponse.json({ status: 'ok'});
};
