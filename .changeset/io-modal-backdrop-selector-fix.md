---
"@iodigital-com/components": patch
---

fix(io-modal): use `[open=""]` selector for backdrop to avoid React 18 false-positive

React 18 (and other frameworks) may set `open="false"` as a string attribute
on custom elements rather than removing the attribute. The CSS selector
`[open]` matches ANY element with the attribute present, regardless of value —
so `open="false"` was triggering the `preventTopLayer` backdrop overlay even
when the modal should be closed.

Changed `:host([prevent-top-layer][open])` to `:host([prevent-top-layer][open=""])`.
Stencil sets `open=""` (empty string) when the prop is `true` and removes the
attribute entirely when `false`, so the empty-string value check correctly
matches only the truly-open state.
