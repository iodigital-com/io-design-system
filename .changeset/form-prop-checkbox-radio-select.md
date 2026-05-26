---
"@io-digital/components": minor
"@io-digital/components-react": minor
"@io-digital/components-vue": minor
"@io-digital/components-angular": minor
---

feat(io-checkbox,io-radio,io-select): add form prop for out-of-DOM form association

Adds a `form?: string` prop to io-checkbox, io-radio, and io-select. Setting `form` to the ID of a `<form>` element allows the field to participate in form submission and validation even when it lives outside the form's DOM subtree — matching native HTML `<input form="...">` behaviour.
