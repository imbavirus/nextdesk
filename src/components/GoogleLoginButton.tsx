'use client';

import { signIn } from 'next-auth/react';

export const GoogleLoginButton = (props : { authCode : string; systemId : string }) => {
  const { authCode, systemId } = props;

  const handleGoogleLogin = () => {
      signIn('google', { callbackUrl: `/auth/finish?systemId=${systemId}&authCode=${authCode}`, state: JSON.stringify({
        systemId,
        authCode,
      }) });
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};
