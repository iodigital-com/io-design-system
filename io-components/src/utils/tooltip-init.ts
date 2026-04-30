/**
 * tooltip-init — public re-export of initTooltipAttribute for use outside the
 * Stencil bundle (e.g. the storefront's StencilInit client component).
 *
 * This file is intentionally separate from tooltip-attribute.ts so that it can
 * be included in the package's exports without being inside a @Component file
 * (Stencil restricts component files to a single class export).
 */
export { initTooltipAttribute } from './tooltip-attribute';
