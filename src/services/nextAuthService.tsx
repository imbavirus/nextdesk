import { Account, NextAuthOptions, Profile, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

export const authOptions : NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          url: 'https://accounts.google.com/o/oauth2/v2/auth',
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope: 'openid profile email',
          },
        },
      },),
    ],
    callbacks: {
      async redirect({ url }) {
    
        return url; // Return the base URL or you can redirect to a custom page
      },
      async signIn({ account, user }) {
        return !!account && !!user && !!user.email && !!account.id_token;
      },
      async jwt({ token, account } : {
            token : JWT;
            user : User | AdapterUser;
            account : Account | null;
            profile ?: Profile | undefined;
            trigger ?: 'signIn' | 'signUp' | 'update';
            isNewUser ?: boolean;
            session ?: Session;
        }) {
          if (token.name && account?.id_token) {
            token.name = account?.id_token; // TODO: abusing token name as accessToken
            token.picture = account?.provider; // TODO: abusing token picture as provider
          }
        return token;
      },
      async session({ session, token }) {
        const accessToken : string = token.name as string;
        const provider : string = token.picture as string;
        if (session.user && accessToken) {
          session.user.name = accessToken; // TODO: abusing session name as accessToken
          session.user.image = provider; // TODO: abusing session image as provider
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      error: '/auth/error', // Error code passed in query string as ?error=
      verifyRequest: '/auth/verify-request', // (used for check email message)
    },
};
