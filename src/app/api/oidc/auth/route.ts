// app/api/oidc/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { env } from 'process';
import { prisma } from '@/services/prismaService';

/**
 * @openapi
 * Initiate OIDC authentication
 * @desc: Start the OIDC authentication process for a device
 * @auth: none
 * @params: OidcAuthRequest
 * @response: OidcAuthResponse
 */
export async function POST(req : NextRequest) {
  const contentType = req.headers.get('content-type');

  // Handle raw POST with custom fields
  if (contentType?.includes('application/json')) {
    const body = await req.json();
    console.log('Received external payload:', body);

    const { id, op, uuid } = body;
  
    // ✅ Validate input
    if (!id || !op || !uuid) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (op !== 'google') {
      return NextResponse.json({ error: 'Unsupported provider' }, { status: 400 });
    }
  
    const code = crypto.randomUUID();

    await prisma.authCode.create({
      data: {
        id: code,
        systemId: id,
        isActive: true,
      },
    });
  
    // const signInUrl = new URL(`${env.NEXTAUTH_URL}/signin/google`);
    const signInUrl = new URL(`${env.BASE_URL}auth/signin`);
    signInUrl.searchParams.set('authCode', code);
    signInUrl.searchParams.set('systemId', id);
    signInUrl.searchParams.set('redirect', 'false'); 

    return NextResponse.json({
      code,
      url: signInUrl.toString(),
    });
  }
}

