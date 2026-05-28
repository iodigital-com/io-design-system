# @iodigital-com/components-angular

Angular wrapper package for [io Digital Web Components](https://github.com/iodigital-com/io-design-system).

This package provides fully-typed Angular components and directives that wrap the `@iodigital-com/components` Stencil web components. Components integrate naturally with Angular's template syntax, reactive forms, and change detection.

## Installation

```bash
npm install @iodigital-com/components-angular @iodigital-com/components
```

Configure your `.npmrc` to resolve the `@io-digital` scope from GitHub Packages:

```ini
@io-digital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

## Peer dependencies

| Package | Required version |
|---|---|
| `@angular/core` | `>=17.0.0 <21.0.0` |
| `rxjs` | `^7.8.0` |
| `@iodigital-com/components` | `^1.2.0` |

## Setup

### 1. Add global styles

Import the global stylesheet from `@iodigital-com/components` in your `angular.json`:

```json
"styles": [
  "node_modules/@iodigital-com/components/dist/io-components/io-components.css",
  "src/styles.css"
]
```

Or import it directly in your root stylesheet (`src/styles.css`):

```css
@import '@iodigital-com/components/dist/io-components/io-components.css';
```

### 2. Enable custom elements schema (standalone components)

In each standalone component or module that uses io components, add `CUSTOM_ELEMENTS_SCHEMA`:

```ts
// app.component.ts (standalone)
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IoButtonModule, IoInputModule } from '@iodigital-com/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IoButtonModule, IoInputModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <io-input label="Name" name="name" required />
    <io-button variant="primary" (click)="handleClick()">Submit</io-button>
  `,
})
export class AppComponent {
  handleClick() { /* ... */ }
}
```

### 3. NgModule setup (non-standalone)

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IoComponentsAngularModule } from '@iodigital-com/components-angular';

@NgModule({
  imports: [IoComponentsAngularModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

## Quick start

```html
<!-- app.component.html -->
<io-input
  label="Email"
  name="email"
  type="email"
  [required]="true"
  (change)="onEmailChange($event)"
></io-input>

<io-select label="Role" name="role" [required]="true">
  <io-option value="admin">Admin</io-option>
  <io-option value="user">User</io-option>
</io-select>

<io-button variant="primary" type="submit">Save</io-button>
```

## Event handling

Custom events are emitted as Angular `EventEmitter`-compatible outputs. Use Angular event binding syntax:

```html
<io-tabs
  [activeTabIndex]="selectedTab"
  (update)="onTabChange($event)"
>
  <button type="button">Overview</button>
  <button type="button">Details</button>
</io-tabs>
```

```ts
onTabChange(event: CustomEvent<{ activeTabIndex: number }>) {
  this.selectedTab = event.detail.activeTabIndex;
}
```

## Reactive forms

io form components work with Angular Reactive Forms via the `value` property and `change`/`input` events. Use a `ControlValueAccessor` pattern or bind directly:

```html
<io-input
  label="Name"
  [value]="nameControl.value"
  (change)="nameControl.setValue($event.target.value)"
></io-input>
```

For tighter integration, implement a custom `ControlValueAccessor` wrapping the `io-input` or `io-select` element.

## Component refs

Access the underlying web component via `@ViewChild`:

```ts
@ViewChild('modal') modalRef!: ElementRef<HTMLIoModalElement>;

openModal() {
  this.modalRef.nativeElement.show();
}
```

```html
<io-modal #modal heading="Confirm">
  Are you sure?
</io-modal>
```

## SSR / Angular Universal

Custom elements rely on browser APIs. In Angular Universal (SSR), guard usage with `isPlatformBrowser`:

```ts
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

constructor(@Inject(PLATFORM_ID) private platformId: object) {}

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    // safe to interact with web components
  }
}
```

## Known limitations

- **SSR / Angular Universal**: Custom elements cannot render on the server. The components will be skipped during SSR and hydrated on the client.
- **Zone.js and change detection**: Custom element events fire outside Angular's zone. If change detection does not trigger automatically, inject `NgZone` and run updates inside `ngZone.run(...)`.
- **Reactive forms binding**: Full `ControlValueAccessor` integration requires a custom wrapper — the package does not ship one out of the box.

## Documentation

Full component documentation, API reference, and interactive examples:
**https://io-design-system.iodigital.com**

## Contributing

See [CONTRIBUTING.md](https://github.com/iodigital-com/io-design-system/blob/main/CONTRIBUTING.md).

## License

MIT
