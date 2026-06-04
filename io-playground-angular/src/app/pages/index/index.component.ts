import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <main>
      <h1>io Design System — Angular 20 Playground</h1>
      <p style="color: var(--io-text-secondary); font-size: 0.875rem;">
        Use the nav links to test each component. Tests here catch Angular-specific issues:
        change detection, reactive forms, two-way binding with Web Components.
      </p>
    </main>
  `,
})
export class IndexComponent {}
