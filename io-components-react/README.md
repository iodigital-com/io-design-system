# @iodigital-com/components-react

React wrapper package for [io Digital Web Components](https://github.com/iodigital-com/io-design-system).

This package provides fully-typed React components that wrap the `@iodigital-com/components` Stencil web components. Every component is a thin React binding — props, events, and refs work exactly as you would expect in a React application.

## Installation

```bash
npm install @iodigital-com/components-react @iodigital-com/components
```

Configure your `.npmrc` to resolve the `@io-digital` scope from GitHub Packages:

```ini
@io-digital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

## Peer dependencies

| Package | Required version |
|---|---|
| `react` | `>=18.0.0` |
| `react-dom` | `>=18.0.0` |
| `@iodigital-com/components` | `^1.2.0` |

## Quick start

Import the global stylesheet from `@iodigital-com/components` once at your application root (e.g. `_app.tsx` or `layout.tsx`):

```tsx
// app/layout.tsx (Next.js App Router) or _app.tsx (Pages Router)
import '@iodigital-com/components/dist/io-components/io-components.css';
```

Then use any component directly:

```tsx
import { IoButton, IoInput, IoSelect } from '@iodigital-com/components-react';

export default function MyForm() {
  return (
    <form>
      <IoInput label="Name" name="name" required />
      <IoSelect label="Role" name="role">
        <io-option value="admin">Admin</io-option>
        <io-option value="user">User</io-option>
      </IoSelect>
      <IoButton type="submit" variant="primary">
        Submit
      </IoButton>
    </form>
  );
}
```

## Event handling

Custom events are exposed as camelCase `onEventName` props:

```tsx
<IoButton onClick={() => console.log('clicked')}>
  Click me
</IoButton>

<IoTabs
  activeTabIndex={activeTab}
  onUpdate={(e) => setActiveTab(e.detail.activeTabIndex)}
>
  <button type="button">Tab 1</button>
  <button type="button">Tab 2</button>
</IoTabs>
```

## Component refs

Access the underlying web component element via `ref`:

```tsx
import { useRef } from 'react';
import { IoModal } from '@iodigital-com/components-react';

export default function Page() {
  const modalRef = useRef<HTMLIoModalElement>(null);

  return (
    <>
      <button onClick={() => modalRef.current?.show()}>Open</button>
      <IoModal ref={modalRef} heading="Hello">
        Modal content
      </IoModal>
    </>
  );
}
```

## SSR / Next.js considerations

io components are custom elements — they rely on browser APIs and must be client-rendered. In Next.js App Router, mark any component tree that uses io components with `'use client'`:

```tsx
'use client';

import { IoButton } from '@iodigital-com/components-react';

export function MyButton() {
  return <IoButton variant="primary">Click me</IoButton>;
}
```

The web component registration happens automatically when the package is imported. No additional setup is required for client-side rendering.

## Known limitations

- **Server-side rendering**: Custom elements cannot render on the server. Use `'use client'` boundaries in Next.js or `ClientOnly` wrappers in Remix.
- **Slot-based children**: Some components accept slotted children (e.g. `io-option` inside `io-select`). Pass these as JSX children using the native tag names (`<io-option>`, `<io-optgroup>`).
- **TypeScript**: Full type definitions are included. If you see unknown element errors, ensure `@iodigital-com/components` is installed and your `tsconfig.json` includes `"skipLibCheck": false` (or that `custom-elements.d.ts` is included via the types field).

## Documentation

Full component documentation, API reference, and interactive examples are available at the storefront:
**https://io-design-system.iodigital.com**

## Contributing

See [CONTRIBUTING.md](https://github.com/iodigital-com/io-design-system/blob/main/CONTRIBUTING.md) for development and contribution guidelines.

## License

MIT
