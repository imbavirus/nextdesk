//app/api/oidc/auth/[...nextauth]/route.ts
import { authOptions } from '@/services/nextAuthService';
import NextAuth from 'next-auth';

/**
 * @openapi
 * OIDC NextAuth authentication handler
 * @desc: Handle OIDC authentication requests through NextAuth.js
 * @auth: none
 * @response: NextAuthResponse
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
