// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

/**
 * Props for the LoadingMessage live-region helper.
 *
 * Renders a polite `role="status"` span that announces loading state transitions
 * to assistive technology (WCAG SC 4.1.3 — Status Messages).
 *
 * Usage:
 *   Render `<LoadingMessage id={loadingId} loading={this.loading} initialLoading={this.initialLoading} />`
 *   as a sibling to the interactive element (not inside it) so it is outside the
 *   accessible subtree of the control and does not interfere with its name/description.
 */
export interface LoadingMessageProps {
  /** The stable element ID — include in `aria-describedby` on the host while `loading=true` */
  id: string;
  /** Whether the component is currently in a loading state */
  loading: boolean;
  /**
   * True once the component has been loading at least once since mount.
   * Guards the live-region: prevents a "Loading finished" announcement on initial render
   * when the component has never been loading.
   */
  initialLoading: boolean;
  /** Announcement text while loading. Defaults to "Loading". */
  loadingDescription?: string;
  /** Announcement text once loading finishes. Defaults to "Loading finished". */
  loadingFinishedDescription?: string;
  /** Optional extra CSS class (e.g. component-scoped SR-only class) */
  class?: string;
}

/**
 * LoadingMessage — shared live-region primitive.
 *
 * Renders a polite status span with three possible text states:
 * - `loading=true`  + `initialLoading=true`  → loadingDescription  ("Loading")
 * - `loading=false` + `initialLoading=true`  → loadingFinishedDescription ("Loading finished")
 * - `loading=false` + `initialLoading=false` → empty string (no announcement on initial render)
 */
export function LoadingMessage(props: LoadingMessageProps) {
  const loadingText = props.loadingDescription ?? 'Loading';
  const finishedText = props.loadingFinishedDescription ?? 'Loading finished';

  let message = '';
  if (props.loading && props.initialLoading) {
    message = loadingText;
  } else if (!props.loading && props.initialLoading) {
    message = finishedText;
  }

  return (
    <span
      id={props.id}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class={props.class}
    >
      {message}
    </span>
  );
}
