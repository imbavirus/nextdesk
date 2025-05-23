//app/api/auth/[...nextauth]/route.ts
import { authOptions } from '@/services/nextAuthService';
import NextAuth from 'next-auth';

/**
 * @openapi
 * NextAuth authentication handler
 * @desc: Handle NextAuth.js authentication requests
 * @auth: none
 * @response: NextAuthResponse
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
