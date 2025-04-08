'use client';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Finish = () => {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  useEffect(() => {
    const runAsync = async () => {

      const authCode = searchParams.get('authCode');
      const systemId = searchParams.get('systemId');
      const provider = session?.user?.image;
      const accessToken = session?.user?.name;
      const email = session?.user?.email;

      if (!authCode || !systemId || !provider || !accessToken || !email || status !== 'authenticated') return;
      const res = await fetch('/api/oidc/auth/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authCode,
          provider,
          systemId,
          accessToken,
          email,
        }),
      });

      const json = await res.json();
      if (json.success) {
        console.log('Saved successfully!');
      } else {
        console.error('Error saving:', json.error);
      }
      console.log('SIGN IN ENDED6');

      return json;
    };

    runAsync();
  }, [session, searchParams, status]);

  return (
    <div suppressHydrationWarning>
      <h1>Finish</h1>
    </div>
  );
};

export default Finish;
