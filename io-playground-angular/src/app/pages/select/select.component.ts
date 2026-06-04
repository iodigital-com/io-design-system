import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main>
      <h1>io-select — Value Change Test</h1>
      <io-select
        label="Fruit"
        name="fruit"
        (change)="value.set($any($event.detail)?.value ?? $any($event.target).value)"
      >
        <option value="">Choose fruit</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </io-select>
      <div class="result" data-testid="result">Selected: {{ value() || 'none' }}</div>
    </main>
  `,
})
export class SelectComponent {
  value = signal('');
}
