//app/api/oidc/auth/[...nextauth]/route.ts
import { authOptions } from '@/services/nextAuthService';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
