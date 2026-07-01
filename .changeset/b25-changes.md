---
"@iodigital-com/components": patch
---

fix(io-spinner, io-progress): ARIA and animation improvements. io-progress now sets aria-busy="true" in indeterminate mode and throttles aria-valuenow to integer-only changes to reduce screen reader verbosity; indeterminate animation replaced with a two-stage primary/secondary keyframe pattern that eliminates the gap between cycles, controlled by the new --io-progress-indeterminate-duration token. io-spinner migrates from a CSS-border ring to a two-circle SVG (track + arc) for smoother rendering and forced-colors support; adds a context prop (inline|blocking) to switch between role="status" and role="alert"; expands size scale to include xs and xl; exposes --io-spinner-size, --io-spinner-color, --io-spinner-track-color, and --io-spinner-duration CSS variable overrides; deprecates the aria object prop in favor of native host attributes.
