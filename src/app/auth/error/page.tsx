const Error = async (props : { searchParams : Promise<{ [key : string] : string }> }) => {
  const error = (await props?.searchParams)?.error;

  return (
    <div suppressHydrationWarning>
      <h1>Google Sign in Failed!</h1>
      <h1>{error}</h1>
    </div>
  );
};

export default Error;
