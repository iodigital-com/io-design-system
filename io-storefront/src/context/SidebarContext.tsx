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
  const [isSidebarStartOpen, setSidebarStartOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });

  // Initialise synchronously from pathname so `#io-sidebar-end` exists on the
  // very first render when landing on a configurator page (avoids a 2nd-render flicker).
  // On mobile viewports the drawer starts closed — user opens it via the FAB.
  const [isSidebarEndOpen, setSidebarEndOpen] = useState(() => {
    if (typeof window === 'undefined') return Boolean(pathname?.includes('/configurator'));
    if (window.innerWidth < 1024) return false;
    return Boolean(pathname?.includes('/configurator'));
  });

  // Keep sidebar-end in sync when the user navigates between tabs.
  useEffect(() => {
    if (!pathname?.includes('/configurator')) {
      // Always close when leaving a configurator page.
      setSidebarEndOpen(false);
    } else if (typeof window === 'undefined' || window.innerWidth >= 1024) {
      // Auto-open on desktop configurator pages.
      setSidebarEndOpen(true);
    }
    // On mobile configurator pages: leave it closed so the user can tap the FAB.
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
