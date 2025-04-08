import { GoogleLoginButton } from '@/components/GoogleLoginButton';

const SignIn = async (props : { searchParams : Promise<{ [key : string] : string }> }) => {
  const searchParams = await props.searchParams;
  const authCode = searchParams ? searchParams['authCode'] : undefined;
  const systemId = searchParams ? searchParams['systemId'] : undefined;

  if (!authCode || !systemId)
    return;


  return (
    <div suppressHydrationWarning>
      <h1>Sign in</h1>
      <GoogleLoginButton authCode={authCode} systemId={systemId} />
    </div>
  );
};

export default SignIn;
