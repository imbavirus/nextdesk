'use client';

import SwaggerUIClient from './SwaggerUI';

export default function SwaggerUIWrapper() {
  return (
    <div>
      <style jsx global>{`
        .swagger-ui {
          background-color: #dcefd8;
        }
        body {
          background-color: #dcefd8 !important;
        }
      `}</style>
      <SwaggerUIClient />
    </div>
  );
} 