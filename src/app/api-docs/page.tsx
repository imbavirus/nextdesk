// src/app/api-docs/page.tsx
import SwaggerUIClient from '../../components/SwaggerUI';

export default function ApiDocsPage() {
  return (
    <div suppressHydrationWarning>
      <SwaggerUIClient />
    </div>
  );
}
