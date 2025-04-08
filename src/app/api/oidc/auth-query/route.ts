import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/services/prismaService';
import { UserPayload } from '@/types/user/UserPayload';

export async function GET(req : NextRequest) {
  const { searchParams } = new URL(req.url);
  const authCodeId = searchParams.get('code');
  const systemId = searchParams.get('id');
  const uuid = searchParams.get('uuid');

  if (!authCodeId || !systemId) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  const session = await prisma.authCode.findFirst({ where: { id: authCodeId, systemId }});

  if (!session) {
    return NextResponse.json({ error: 'No authed oidc is found' }, { status: 200 });
  }

  if (!session.userId) {
    return NextResponse.json({ error: 'No authed oidc is found' }, { status: 200 });
  }

  const user = await prisma.user.findFirst({ where: { id: session.userId }});

  if (!user) {
    return NextResponse.json({ error: '"No authed oidc is found"' }, { status: 200 });
  }

  console.log('Made it through');
  const data = {
    user_info: { name: user.name, status: user.status },
    access_token: session.accessToken,
    'type': 'access_token',
    'tfa_type': 'none', // Adjust if you implement 2FA
    'secret': uuid,
    'user': user as UserPayload,
  };
  console.log(data);

  return NextResponse.json({
    data
  }, { status: 200 });
}
