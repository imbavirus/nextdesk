//app/api/oidc/auth/complete/route.ts
import { updateAuthCodeToken } from '@/services/authCodeService';
import { createOidcToken } from '@/services/tokenService';
import { createOidcUser } from '@/services/userService';
import { NextResponse } from 'next/server';

export async function POST(req : Request) {
    const body = await req.json();
    const { email, authCode, provider, systemId, accessToken } = body;

    try {
        const savedUser = await createOidcUser(email, provider);
        console.log('SIGN IN ENDED2');
        if (!savedUser) return;

        await updateAuthCodeToken(authCode, systemId, accessToken, savedUser.id);
        console.log('SIGN IN ENDED4');

        await createOidcToken(savedUser.id, systemId, provider, accessToken);

        return NextResponse.json({ success: true, data: { 
            user_info: savedUser,
            accessToken,
            type: 'access_token', 
        } });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
    }
}
