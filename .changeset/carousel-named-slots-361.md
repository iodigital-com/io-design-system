---
'@io-digital/components': minor
---

feat(io-carousel): add heading, description, and controls named slots

- `heading` slot — rendered above the slide track; when occupied, the carousel region switches from `aria-label` to `aria-labelledby` pointing to a stable generated ID, preserving the semantic label relationship
- `description` slot — rendered below the heading and above the slide track; hidden via CSS class (NOT `:empty`) when no slot content is assigned
- `controls` slot — rendered inside `.carousel-wrap` adjacent to the navigation buttons; intended for pagination dots, thumbnails, or other custom indicators
- Each slot is detected via `onSlotchange` wired directly on `<slot name="...">` (NOT `@Listen('slotchange')`)
- Slot occupancy tracked by `@State() hasHeadingSlot`, `hasDescriptionSlot`, `hasControlsSlot` — containers hidden via CSS modifier classes, not `:empty`
- `headingId` generated in `componentWillLoad()` for stable `aria-labelledby` binding
- `label` prop remains supported; used as `aria-label` when the heading slot is empty
