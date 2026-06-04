---
"@iodigital-com/components": patch
---

**Breaking:** `io-select` `change` event detail changed from bare `string | string[]` to `{ value: string | string[]; name?: string }`. Update event handlers: `event.detail` → `event.detail.value`.
