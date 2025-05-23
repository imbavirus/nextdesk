//app/api/oidc/query/route.ts
import { prisma } from '@/services/prismaService';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/services/nextAuthService';

/**
 * @openapi
 * Query OIDC authentication code
 * @desc: Check if an OIDC authentication code is ready
 * @auth: none
 * @params: OidcQueryRequest
 * @response: LoginResponse
 */
export async function POST(req : NextRequest) {
  const { code } = await req.json();

  const session = await prisma.authCode.findFirst({ where: { id: code }});
  const currentSession = getServerSession(authOptions);
  console.log('GET SESSION', currentSession);
  if (!session) {
    return NextResponse.json({ error: 'Not ready' }, { status: 404 });
  }

  if (!session.accessToken) {
    return NextResponse.json({ error: 'Still waiting' }, { status: 202 });
  }

  return NextResponse.json({
    access_token: session.accessToken,
    // user: session.user,
    type: 'access_token',
  });
};
