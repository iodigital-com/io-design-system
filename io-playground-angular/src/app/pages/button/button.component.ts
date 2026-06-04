import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main>
      <h1>io-button — Click Event Test</h1>
      <io-button (click)="count.update(c => c + 1)">Click me</io-button>
      <io-button variant="ghost" (click)="count.set(0)" style="margin-left: 0.5rem">Reset</io-button>
      <div class="result" data-testid="result">Click count: {{ count() }}</div>
    </main>
  `,
})
export class ButtonComponent {
  count = signal(0);
}
