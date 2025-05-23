// src/app/api-docs/page.tsx
import SwaggerUIWrapper from '../../components/SwaggerUIWrapper';

export default function ApiDocsPage() {
  return (
    <div suppressHydrationWarning>
      <SwaggerUIWrapper />
    </div>
  );
}
