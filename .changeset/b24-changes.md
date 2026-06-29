---
"@iodigital-com/components": patch
---

fix(io-tabs-bar): use navigation semantics for anchor children (#978); anchor-only children now render inside a `<nav>` landmark with `aria-current="page"` instead of `role="tablist"` + `aria-selected`. Add ResizeObserver to re-center the active tab on container resize (#968). Add edge-fade CSS mask with IntersectionObserver sentinels to signal overflow (#961). Add `--io-tabs-bar-fade-size` and `--io-tabs-bar-fade-color` public tokens. Add new `io-tab-panel` sub-component that auto-wires ARIA contracts when used inside `io-tabs`, eliminating manual `panelIds` management (#953). Add `closeable` prop and `tabClose` event to `io-tabs` for dismissible tabs with accessible close buttons (#949).
