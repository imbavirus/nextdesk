import { unauthorizedResponse } from '@/app/manager/loginManager';
import { getBearerToken } from '@/app/manager/tokenManager';
import { getUserGuidFromId, getUserIdFromToken } from '@/app/manager/userManager';
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
