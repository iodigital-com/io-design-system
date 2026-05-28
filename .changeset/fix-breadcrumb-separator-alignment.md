---
"@iodigital-com/components": patch
---

fix(io-breadcrumb): render separator in item shadow DOM, fix broken slotchange query, add chevron default

The separator was never visible because `handleSlotChange` queried slotted items via the shadow DOM `ol` — slotted (light DOM) children are not reachable that way. Separators are now rendered inside each `io-breadcrumb-item`'s shadow DOM as a `<span class="breadcrumb__separator" aria-hidden="true">` that is hidden when `current=true`. The RTL `scaleX(-1)` flip moves to `io-breadcrumb-item-styles`. Default separator character updated from `/` to `›`; overridable via `--io-breadcrumb-separator`. The storefront configurator and examples pages are centered and scrubbed of pre-release migration notes.
