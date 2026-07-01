---
'@iodigital-com/components': minor
---

feat(io-heading, io-text, io-divider): B42 typography and layout enhancements

**io-heading:**
- Add `5xl` (36px) and `6xl` (48px) hero-scale sizes to `IoHeadingSize` (#1037)
- Infer semantic heading tag from size when `tag` prop is omitted (6xl/5xl/4xl→h1, 3xl/2xl→h2, xl→h3, lg→h4, md→h5, sm→h6); downgrade to `div` when a heading ancestor is detected to prevent illegal nesting (#1036)
- Downgrade console.error to console.warn (dev-only) for missing `tag` prop
- Support responsive breakpoint sizes via breakpoint object: `size='{"base":"2xl","l":"5xl"}'` (#1032)

**io-text:**
- Add `address`, `figcaption`, `cite`, and `legend` to `IoTextTag` union (#1020)
- Guard against illegal self-nesting: `blockquote`, `address`, `p` downgrade to `div` when nested inside the same element type (#1036)
- Support responsive breakpoint sizes: `size='{"base":"sm","l":"lg"}'` (#1032)

**io-divider:**
- Support responsive orientation via breakpoint object: `orientation='{"base":"horizontal","l":"vertical"}'` (#1033)

**io-storefront:**
- Update io-text usage page with role-based color model documentation vs contrast-tier systems, semantic tag selection guide (#1027)
- Update io-heading configurator and API docs for new sizes and tag inference
- Add `textStorySemanticTags` example story for new io-text tag values
