---
'@iodigital-com/components': minor
---

feat: add io-grid, io-link-tile, io-button-tile, and io-app-shell components

- **io-grid**: 12-column responsive CSS Grid layout primitive with four fluid gap presets (none/sm/md/lg) driven by clamp() tokens, align and justify props, and companion io-grid-item with colSpan/rowSpan/colStart support. Uses shadow: false (light DOM) so consumers can style children without Shadow DOM boundaries. New tokens: --io-grid-columns, --io-grid-gap-{none,sm,md,lg}, --io-container-{narrow,basic,wide}-max.

- **io-link-tile**: Media tile primitive with an embedded full-surface anchor. Bundles media (img/picture/video), overlay label/description, optional gradient, four aspect ratio presets (1/1, 4/3, 3/4, 16/9), and header/footer named slots. Focus delegates from host to the anchor via delegatesFocus.

- **io-button-tile**: Sibling to io-link-tile for action-triggered tiles. Renders a full-surface button instead of an anchor, with disabled/loading states, aria-busy support, and tileClick event emission.

- **io-app-shell**: Full-page application shell with sticky header (header-start/title/header-end slots), collapsible sidebar-start (focus trap + scroll lock on mobile overlay), optional sidebar-end panel, main content area with skip-to-main link (WCAG 2.4.1), footer, and background media slot. Matches io-flyout patterns for focus management.
