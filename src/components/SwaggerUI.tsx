// components/SwaggerUIClient.tsx
'use client'; // This directive makes the component a client-side component.
import 'swagger-ui-react/swagger-ui.css';

import dynamic from 'next/dynamic';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <p>Loading Swagger UI...</p>,
});

const SwaggerUIClient = () => {
  return <SwaggerUI url='/swagger.json' />;
};

export default SwaggerUIClient;
