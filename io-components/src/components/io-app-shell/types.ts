/**
 * io-app-shell type unions.
 */

/** Mobile breakpoint preset at which the sidebar collapses to an overlay. */
export type IoAppShellMobileBreakpoint = 'sm' | 'md' | 'lg';

export const IO_APP_SHELL_MOBILE_BREAKPOINT_VALUES: IoAppShellMobileBreakpoint[] = ['sm', 'md', 'lg'];

/** Sidebar-start update event detail. */
export interface IoAppShellSidebarStartUpdateDetail {
  open: boolean;
}

/** Sidebar-end dismiss event detail. */
export interface IoAppShellSidebarEndDismissDetail {
  reason: 'close-button' | 'backdrop' | 'escape';
}
