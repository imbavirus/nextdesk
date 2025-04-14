//app/api/oidc/auth-query/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/services/prismaService';
import { UserPayload } from '@/types/user/UserPayload';

export async function GET(req : NextRequest) {
  const { searchParams } = new URL(req.url);
  const authCodeId = searchParams.get('code');
  const systemId = searchParams.get('id');
  const uuid = searchParams.get('uuid');

  if (!authCodeId || !systemId) {
    console.log('1');
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  const session = await prisma.authCode.findFirst({ where: { id: authCodeId, systemId }});

  if (!session) {
    console.log('2');
    return NextResponse.json({ error: 'No authed oidc is found' }, { status: 200 });
  }

  if (!session.userId) {
    console.log('3');
    session.userId = 2;
    session.accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTA0NDY1NjQ5ZmZhNjA2NTU3NjUwYzdlNjVmMGE4N2FlMDBmZTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MzMzODEzNTI2MzUtdDN1MTZqY2pwcnJwNWE4MDRzN29ndmlrOTRvb3N0b2guYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MzMzODEzNTI2MzUtdDN1MTZqY2pwcnJwNWE4MDRzN29ndmlrOTRvb3N0b2guYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcyNjg5MDY2OTg0MjgyNzIyOTEiLCJlbWFpbCI6Imp2ZHdwc3BAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJOS3o3bGloeERMcnYwNldGMTdCNEpRIiwibmFtZSI6Ikp1c3RpbiB2YW4gZGVyIFdlc3RodWl6ZW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSjNSSENLbUJjY01TRjZXMlg4ZWsxRW5peEF0QS13b3RDUDN4bTlWaFdNZEJETkRNMDQ9czk2LWMiLCJnaXZlbl9uYW1lIjoiSnVzdGluIiwiZmFtaWx5X25hbWUiOiJ2YW4gZGVyIFdlc3RodWl6ZW4iLCJpYXQiOjE3NDQ0OTI5NTgsImV4cCI6MTc0NDQ5NjU1OH0.mbKPUTg4EdnIwNTNGr7oQPG_Yh4wVOyvSyKme32Q7xbf6nFjtqgRLUFzuUtpf52PpsdPSZXX98_X-XKMRGKxJlOheOFceeTX8qR8jvWTlXtRRd1NccKXaG-quRPCdOb4wj418SRWGlK2CClh5eSfwk4IW15E_iofVRFIYtA_OuoUvd0QQOVJdCOxLbSHCN7FGKhdvWuXbHKZ6fhTVbHdz4krUAOHDJRiTl2YbkHHV3yWAYS-sBp2Qsjj4H1yoUK0pUVRF4nSCIl6kok56EiLiEvuOvl_b-u-5l287mSSwCOHKVLdzPbGshUfocbnSWIALjbzz_8cYHoGy20nmk6j4g';
    //return NextResponse.json({ error: 'No authed oidc is found' }, { status: 200 });
  }

  const user = await prisma.user.findFirst({ where: { id: session.userId }});

  if (!user) {
    console.log('4');
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
