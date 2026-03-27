'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type SidebarState = {
  isSidebarStartOpen: boolean;
  toggleSidebarStart: () => void;
  isSidebarEndOpen: boolean;
  setSidebarEndOpen: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarState>({
  isSidebarStartOpen: true,
  toggleSidebarStart: () => {},
  isSidebarEndOpen: false,
  setSidebarEndOpen: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarStartOpen, setSidebarStartOpen] = useState(true);

  // Initialise synchronously from pathname so `#io-sidebar-end` exists on the
  // very first render when landing on a configurator page (avoids a 2nd-render flicker).
  const [isSidebarEndOpen, setSidebarEndOpen] = useState(
    () => Boolean(pathname?.includes('/configurator')),
  );

  // Keep sidebar-end in sync when the user navigates between tabs.
  useEffect(() => {
    setSidebarEndOpen(Boolean(pathname?.includes('/configurator')));
  }, [pathname]);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarStartOpen,
        toggleSidebarStart: () => setSidebarStartOpen((v) => !v),
        isSidebarEndOpen,
        setSidebarEndOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
