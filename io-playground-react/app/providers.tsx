'use client';

import { useEffect } from 'react';

export function IoProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Stencil lazy loader — must run in browser only
    import('@iodigital-com/components/loader').then(({ defineCustomElements }) => {
      defineCustomElements(window);
    });
  }, []);
  return <>{children}</>;
}
