import { NgModule } from '@angular/core';
import {
  IoAccordion,
  IoAvatar,
  IoBadge,
  IoBanner,
  IoBreadcrumb,
  IoBreadcrumbItem,
  IoButton,
  IoButtonGroup,
  IoCarousel,
  IoCheckbox,
  IoCheckboxGroup,
  IoDivider,
  IoDrawer,
  IoFormField,
  IoHeading,
  IoInlineNotification,
  IoInput,
  IoLink,
  IoModal,
  IoMultiSelect,
  IoOptgroup,
  IoOption,
  IoPagination,
  IoPinCode,
  IoPopover,
  IoProgress,
  IoRadio,
  IoRadioGroup,
  IoScroller,
  IoSelect,
  IoSpinner,
  IoStep,
  IoStepper,
  IoSwitch,
  IoTable,
  IoTableBody,
  IoTableBodyCell,
  IoTableBodyRow,
  IoTableHead,
  IoTableHeadCell,
  IoTableHeadRow,
  IoTabs,
  IoTabsBar,
  IoTag,
  IoText,
  IoTextarea,
  IoToast,
  IoToastItem,
  IoTooltip,
  IoWordmark,
} from './directives/proxies';

const IO_COMPONENTS = [
  IoAccordion,
  IoAvatar,
  IoBadge,
  IoBanner,
  IoBreadcrumb,
  IoBreadcrumbItem,
  IoButton,
  IoButtonGroup,
  IoCarousel,
  IoCheckbox,
  IoCheckboxGroup,
  IoDivider,
  IoDrawer,
  IoFormField,
  IoHeading,
  IoInlineNotification,
  IoInput,
  IoLink,
  IoModal,
  IoMultiSelect,
  IoOptgroup,
  IoOption,
  IoPagination,
  IoPinCode,
  IoPopover,
  IoProgress,
  IoRadio,
  IoRadioGroup,
  IoScroller,
  IoSelect,
  IoSpinner,
  IoStep,
  IoStepper,
  IoSwitch,
  IoTable,
  IoTableBody,
  IoTableBodyCell,
  IoTableBodyRow,
  IoTableHead,
  IoTableHeadCell,
  IoTableHeadRow,
  IoTabs,
  IoTabsBar,
  IoTag,
  IoText,
  IoTextarea,
  IoToast,
  IoToastItem,
  IoTooltip,
  IoWordmark,
];

/**
 * Barrel NgModule that registers every iO Design System Angular component.
 *
 * Importing this module once gives a standalone component access to all
 * `io-*` elements with full type-safe bindings and typed event payloads —
 * no `CUSTOM_ELEMENTS_SCHEMA` workaround needed.
 *
 * @example
 * // app.component.ts (Angular v17+ standalone)
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
 * export class AppComponent { ... }
 *
 * @example
 * // AppModule (NgModule-based apps)
 * import { IoComponentsAngularModule } from '@iodigital-com/components-angular';
 *
 * @NgModule({
 *   imports: [IoComponentsAngularModule],
 * })
 * export class AppModule {}
 */
@NgModule({
  imports: IO_COMPONENTS,
  exports: IO_COMPONENTS,
})
export class IoComponentsAngularModule {}
