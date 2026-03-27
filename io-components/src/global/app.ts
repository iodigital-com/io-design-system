/**
 * Stencil global script — runs once when the component library is initialised.
 * Registers the input modality tracker so all io-* components inherit
 * --io-focus-ring-active automatically via CSS custom property inheritance.
 */
import { initFocusVisible } from '../utils/focus-visible';

initFocusVisible();
