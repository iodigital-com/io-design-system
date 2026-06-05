---
"@iodigital-com/components": minor
---

feat(io-icon): expand registry to 455 icons; add fixedWidth, inherit size, CSS var override

Expands `ICON_NODES` in `src/utils/icons.ts` from 51 to **455 icons** across 27 categories. All icons pre-extracted from `lucide@^0.577.0` — no runtime import. `IoIconName` union auto-expands.

**New component features**

- `fixedWidth` prop — forces host width to match icon size for consistent column alignment in nav menus and icon lists
- `size="inherit"` — scales icon to match parent `font-size`; useful for inline-with-text usage
- `--io-icon-size` CSS variable — per-instance size override without a prop change

**New icon categories (350 icons)**

Accessibility, Accounts & Access, Arrows, Buildings, Charts, Design, Development, Files, Finance, Layout, Mail, Multimedia, Navigation, Notifications, Photography, Security, Text, Time & Calendar, Transportation, Travel, Weather

**WYSIWYG editor icons (48 icons)**

Form actions (save, pen-line, trash, …), text formatting (bold, italic, code, …), headings (h1–h6), block structure (list, quote, indent, …), insert (link, image, table, …), table operations, history & alignment (undo-2, align-left, …)
