# @io-digital/components-vue

Vue 3 wrapper package for [io Digital Web Components](https://github.com/iodigital-com/io-design-system).

This package provides fully-typed Vue 3 components that wrap the `@io-digital/components` Stencil web components. Each component is a thin Vue binding — props, events (`v-on`), and template refs work exactly as expected in a Vue 3 application.

## Installation

```bash
npm install @io-digital/components-vue @io-digital/components
```

Configure your `.npmrc` to resolve the `@io-digital` scope from GitHub Packages:

```ini
@io-digital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

## Peer dependencies

| Package | Required version |
|---|---|
| `vue` | `^3.4.0` |
| `@io-digital/components` | `^1.2.0` |

## Quick start

Import the global stylesheet from `@io-digital/components` once in your application entry point:

```ts
// main.ts
import '@io-digital/components/dist/io-components/io-components.css';
```

Then use any component directly in your templates:

```vue
<script setup lang="ts">
import { IoButton, IoInput, IoSelect } from '@io-digital/components-vue';
</script>

<template>
  <form>
    <IoInput label="Name" name="name" :required="true" />
    <IoSelect label="Role" name="role">
      <io-option value="admin">Admin</io-option>
      <io-option value="user">User</io-option>
    </IoSelect>
    <IoButton type="submit" variant="primary">
      Submit
    </IoButton>
  </form>
</template>
```

## Event handling

Custom events are emitted as camelCase `onEventName` props or can be listened to with `v-on`:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { IoTabs } from '@io-digital/components-vue';

const activeTab = ref(0);
</script>

<template>
  <IoTabs
    :active-tab-index="activeTab"
    @update="(e) => activeTab = e.detail.activeTabIndex"
  >
    <button type="button">Tab 1</button>
    <button type="button">Tab 2</button>
  </IoTabs>
</template>
```

## Component refs

Access the underlying web component element via `ref`:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { IoModal } from '@io-digital/components-vue';

const modalRef = ref<HTMLIoModalElement | null>(null);

function openModal() {
  modalRef.value?.show();
}
</script>

<template>
  <button @click="openModal">Open</button>
  <IoModal ref="modalRef" heading="Hello">
    Modal content
  </IoModal>
</template>
```

## SSR / Nuxt considerations

Custom elements rely on browser APIs and cannot render on the server. In Nuxt 3, use `<ClientOnly>` wrappers or the `#fallback` slot:

```vue
<template>
  <ClientOnly>
    <IoButton variant="primary">Click me</IoButton>
    <template #fallback>
      <button class="btn-primary">Click me</button>
    </template>
  </ClientOnly>
</template>
```

Alternatively, register the component plugin only on the client side in `plugins/io-components.client.ts`.

## Known limitations

- **SSR**: Custom elements cannot render on the server. See the Nuxt section above for the recommended pattern.
- **Slot-based children**: Some components use named slots (e.g. `io-option` inside `io-select`). Pass these as template children using the native tag names.
- **v-model**: Vue's `v-model` does not natively bind to web component `value` props. Use `:value` + `@change`/`@input` for two-way binding on form components.

## Documentation

Full component documentation, API reference, and interactive examples:
**https://io-design-system.iodigital.com**

## Contributing

See [CONTRIBUTING.md](https://github.com/iodigital-com/io-design-system/blob/main/CONTRIBUTING.md).

## License

MIT
