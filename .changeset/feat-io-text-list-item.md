---
"@iodigital-com/components": minor
---

feat(io-text-list-item): add child component for io-text-list

New `io-text-list-item` component for slot-based content projection into list items.
Renders with `shadow: false` to preserve native list semantics and carries
`role="listitem"` automatically. Logs a console warning when used outside
`io-text-list`. Plain `<li>` children remain fully supported alongside this component.
