'use client';

import React from 'react';
import QueryProvider from './QueryProvider';
import { Toaster } from 'sonner';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            color: '#374151',
          },
        }}
      />
    </QueryProvider>
  );
}