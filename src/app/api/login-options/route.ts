//app/api/login-options/route.ts
import { NextResponse } from 'next/server';

const options = [
    'github',
    'gitlab',
    'google',
    'apple',
    'okta',
    'facebook',
    'azure',
    'auth0'
  ];

export async function GET() {
    return NextResponse.json(options.map(x => `oidc/${x}`));
};
