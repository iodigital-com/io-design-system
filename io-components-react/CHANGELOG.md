# @iodigital-com/components-react

## 2.0.0

### Patch Changes

- Updated dependencies [34d86da]
  - @iodigital-com/components@2.0.0

## 1.1.1

### Patch Changes

- 40e1765: Sync wrapper versions to @iodigital-com/components@1.1.1 — version parity across the iO DS package family.

## 1.1.0

### Minor Changes

- Align wrapper packages to @iodigital-com/components@1.1.0 — version parity across the iO DS package family. No functional changes; wrappers are thin framework-binding layers over the core web component package.

### Patch Changes

- Updated dependencies [ec09f1f]
- Updated dependencies [5de8182]
  - @iodigital-com/components@1.1.0

## 1.0.1

### Patch Changes

- fix: export global.css and auto-import from components-react

  Consumers of `@iodigital-com/components-react` now automatically receive all
  `--io-*` CSS custom properties on `:root` without any extra setup. Previously,
  component-level tokens (wordmark sizes, button padding, icon sizes, etc.) were
  undefined in consuming apps because the compiled `app.css` had no export path
  and nothing imported it.

- Updated dependencies
  - @iodigital-com/components@1.0.1

## 1.0.0

### Patch Changes

- Updated dependencies [1a2957c]
- Updated dependencies [4f58a77]
- Updated dependencies [b70f179]
- Updated dependencies [7926d0b]
- Updated dependencies [23b1318]
  - @iodigital-com/components@4.0.0

## 7.0.0

### Patch Changes

- Updated dependencies [0605dc4]
- Updated dependencies [6be0216]
- Updated dependencies [e7d2b32]
- Updated dependencies [f234ead]
- Updated dependencies [f9afc34]
  - @iodigital-com/components@3.0.0

## 6.0.0

### Patch Changes

- Updated dependencies [33baa52]
  - @iodigital-com/components@2.1.0

## 5.0.0

### Major Changes

- b8b0289: **BREAKING CHANGE**: Migrate form-field validation from `error: boolean` + `errorMessage: string` to `state: IoFieldState` + `message: string` across 6 form-field components (io-input, io-textarea, io-select, io-checkbox, io-radio, io-form-field).

  ### Migration guide

  Replace:

  ```html
  <io-input error error-message="Required" />
  <io-select error error-message="Please select" />
  <io-textarea error error-message="Required" />
  <io-checkbox error error-message="Required" />
  <io-radio error error-message="Please select" />
  <io-form-field error error-message="Invalid" />
  ```

  With:

  ```html
  <io-input state="error" message="Required" />
  <io-select state="error" message="Please select" />
  <io-textarea state="error" message="Required" />
  <io-checkbox state="error" message="Required" />
  <io-radio state="error" message="Please select" />
  <io-form-field state="error" message="Invalid" />
  ```

  The new `state` prop also accepts `"success"` and `"warning"` values for richer validation feedback.

### Minor Changes

- 1f5f215: feat(io-checkbox,io-radio,io-select): add form prop for out-of-DOM form association

  Adds a `form?: string` prop to io-checkbox, io-radio, and io-select. Setting `form` to the ID of a `<form>` element allows the field to participate in form submission and validation even when it lives outside the form's DOM subtree — matching native HTML `<input form="...">` behaviour.

### Patch Changes

- Updated dependencies [b98110b]
- Updated dependencies [6bd52a4]
- Updated dependencies [f85a80d]
- Updated dependencies [948b5f6]
- Updated dependencies [23f145f]
- Updated dependencies [5b2747b]
- Updated dependencies [1f5f215]
- Updated dependencies [ab8a49f]
- Updated dependencies [2442aa0]
- Updated dependencies [69770f2]
- Updated dependencies [2806c50]
- Updated dependencies [1a4d170]
- Updated dependencies [a7bea5d]
- Updated dependencies [6cc5ad3]
- Updated dependencies [a40c393]
- Updated dependencies [975d787]
- Updated dependencies [75803fd]
- Updated dependencies [0e54181]
- Updated dependencies [6b211e4]
- Updated dependencies [a5897bf]
- Updated dependencies [e1d51e9]
- Updated dependencies [002632e]
- Updated dependencies [0fa9232]
- Updated dependencies [b21d1db]
- Updated dependencies [adca2e7]
- Updated dependencies [b8b0289]
  - @iodigital-com/components@2.0.0

## 4.0.0

### Patch Changes

- Updated dependencies [b137696]
- Updated dependencies [562ec5c]
- Updated dependencies [64d8ab5]
- Updated dependencies [360cc93]
- Updated dependencies [7094392]
- Updated dependencies [19f89ab]
- Updated dependencies [cab5c52]
- Updated dependencies [cab5c52]
- Updated dependencies [31ab2a3]
- Updated dependencies [5574cdd]
- Updated dependencies [cab5c52]
- Updated dependencies [74bb10f]
- Updated dependencies [6a16027]
- Updated dependencies [1166ab5]
- Updated dependencies [b137696]
- Updated dependencies [8663948]
- Updated dependencies [e2000a1]
  - @iodigital-com/components@1.3.0

## 3.0.0

### Patch Changes

- Updated dependencies [477e2b5]
  - @iodigital-com/components@1.2.0

## 2.0.0

### Minor Changes

- d077906: feat(wave-i): modal open/close methods, input readonly+slots, FACE form integration, axe-core a11y testing

  - `io-modal`: add programmatic `show()` and `close()` `@Method`s (#164)
  - `io-input`: add `readonly` prop and `prefix`/`suffix` named slots (#165)
  - `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`: implement form-associated custom elements (FACE) — values now participate in native `<form>` submit and `FormData` (#166)
  - `io-*`: WCAG 1.4.11 audit — introduce `--io-border-interactive` (#767676) token; fix failing contrast on `io-checkbox`, `io-radio`, and `io-select`/`io-option` checkbox indicators (#230)

### Patch Changes

- Updated dependencies [d077906]
  - @iodigital-com/components@1.1.0
