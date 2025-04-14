//app/api/ab/personal/route.ts
import { unauthorizedResponse } from '@/services/loginService';
import { getBearerToken } from '@/services/tokenService';
import { getUserGuidFromId, getUserIdFromToken } from '@/services/userService';
import { NextResponse } from 'next/server';

export async function GET(req : Request) {
    const bearerToken = getBearerToken(req);
    if (!bearerToken) {
        return unauthorizedResponse('Unauthorized');
    }
    const userId = await getUserIdFromToken(bearerToken);
    const guid = await getUserGuidFromId(userId);
    return NextResponse.json({ guid });
}

export async function POST(req : Request) {
    const bearerToken = getBearerToken(req);
    if (!bearerToken) {
        return unauthorizedResponse('Unauthorized');
    }
    const userId = await getUserIdFromToken(bearerToken);
    const guid = await getUserGuidFromId(userId);
    return NextResponse.json({ guid });
}
