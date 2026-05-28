'use client';

import { useEffect } from 'react';

import { initTooltipAttribute } from '@iodigital-com/components/utils/tooltip-init';

/**
 * StencilInit — client-side initialisation for Stencil global utilities.
 *
 * The Stencil bundle's global script (app.ts) calls initTooltipAttribute()
 * when io-components.esm.js loads. In Next.js App Router, ES module scripts
 * carry inherent defer semantics — there is a window between React hydration
 * and the Stencil module executing where user hover events receive no response.
 *
 * This component guarantees listeners are registered after hydration regardless
 * of Stencil bundle load timing. initTooltipAttribute() is idempotent: the
 * module-level `listenersBound` flag and the `window.__io_tooltip_attr_init`
 * cross-instance flag both prevent double-registration.
 */
export function StencilInit() {
  useEffect(() => {
    initTooltipAttribute();
  }, []);
  return null;
}
