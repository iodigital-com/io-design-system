import { NgModule } from '@angular/core';

import { DIRECTIVES } from './directives';

/**
 * Barrel NgModule that registers every iO Design System Angular component.
 *
 * Importing this module once gives any Angular component or module access to
 * all `io-*` elements with full type-safe bindings and typed event payloads —
 * no `CUSTOM_ELEMENTS_SCHEMA` workaround needed.
 *
 * The component list is sourced from the auto-generated `DIRECTIVES` array in
 * `./directives/index.ts`, so new components are included automatically when
 * the package is rebuilt without any manual changes to this file.
 *
 * @example
 * // AppModule — NgModule-based apps
 * import { IoComponentsAngularModule } from '@iodigital-com/components-angular';
 *
 * @NgModule({
 *   imports: [IoComponentsAngularModule],
 * })
 * export class AppModule {}
 *
 * @example
 * // Standalone component — Angular v17+
 * import { IoComponentsAngularModule } from '@iodigital-com/components-angular';
 *
 * @Component({
 *   imports: [IoComponentsAngularModule],
 *   template: `
 *     <io-button-group type="single" [value]="period()" (change)="period.set($event.detail.value)">
 *       <io-button value="day">Day</io-button>
 *       <io-button value="week">Week</io-button>
 *       <io-button value="month">Month</io-button>
 *     </io-button-group>
 *   `,
 * })
 * export class MyComponent {}
 */
@NgModule({
  imports: DIRECTIVES,
  exports: DIRECTIVES,
})
export class IoComponentsAngularModule {}
