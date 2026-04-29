'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type SidebarState = {
  isSidebarStartOpen: boolean;
  setSidebarStartOpen: (v: boolean) => void;
  toggleSidebarStart: () => void;
  isSidebarEndOpen: boolean;
  setSidebarEndOpen: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarState>({
  isSidebarStartOpen: true,
  setSidebarStartOpen: () => {},
  toggleSidebarStart: () => {},
  isSidebarEndOpen: false,
  setSidebarEndOpen: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarStartOpen, setSidebarStartOpen] = useState(true);

  // Initialise synchronously from pathname so `#io-sidebar-end` exists on the
  // very first render when landing on a configurator page (avoids a 2nd-render flicker).
  // On mobile viewports the drawer starts closed — user opens it via the FAB.
  const [isSidebarEndOpen, setSidebarEndOpen] = useState(Boolean(pathname?.includes('/configurator')));

  // Keep sidebar defaults in sync with viewport changes.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const syncByViewport = () => {
      const isDesktop = mediaQuery.matches;
      setSidebarStartOpen(isDesktop);

      const isConfiguratorPage = Boolean(pathname?.includes('/configurator'));
      setSidebarEndOpen(isDesktop && isConfiguratorPage);
    };

    syncByViewport();
    mediaQuery.addEventListener('change', syncByViewport);
    return () => mediaQuery.removeEventListener('change', syncByViewport);
  }, [pathname]);

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
        setSidebarStartOpen,
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
