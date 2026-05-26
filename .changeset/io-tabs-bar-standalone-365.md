---
'@io-digital/components': minor
---

feat(io-tabs-bar): new standalone tab navigation bar component (#365)

New `io-tabs-bar` component for router-driven tab navigation patterns:

- Renders a `role="tablist"` tab strip with the same visual style as `io-tabs`
- Props: `activeTabIndex` (mutable, reflect, default `0`) and `label` (aria-label for the tablist)
- Event: `update` emitting `{ activeTabIndex: number }` — identical API to `io-tabs`
- Default slot accepts `<button>` elements; component applies `role="tab"`, `aria-selected`, and roving `tabindex` automatically
- Full keyboard navigation: Arrow Left/Right (with wrap), Home, End, Enter, Space; disabled buttons skipped
- Shadow DOM with `delegatesFocus: true`
- No panel management — consumers own content via their router outlet
- WCAG 2.1 AA compliant; axe-core smoke tested
- Registered in `IoTagNames`, `components.d.ts`, and `sitemap.ts`
- All 5 storefront pages: Configurator, Examples, Usage, Accessibility, API
