//app/api/ab/personal/route.ts
import { getUserIdFromRequest, getUserGuidFromId } from '@/services/userService';
import { NextResponse } from 'next/server';

/**
 * @openapi
 * Get personal address book GUID
 * @desc: Retrieve the GUID for a user's personal address book
 * @auth: bearer
 * @response: PersonalResponse
 */
export async function GET(req : Request) {
    const userId = await getUserIdFromRequest(req);
    const guid = await getUserGuidFromId(userId);
    return NextResponse.json({ guid });
}

/**
 * @openapi
 * Update personal address book GUID
 * @desc: Update the GUID for a user's personal address book
 * @auth: bearer
 * @response: PersonalResponse
 */
export async function POST(req : Request) {
    const userId = await getUserIdFromRequest(req);
    const guid = await getUserGuidFromId(userId);
    return NextResponse.json({ guid });
}
