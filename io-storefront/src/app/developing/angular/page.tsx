'use client';

import { PageHeader } from '@/components/layout/PageHeader';

export default function DevelopingAngularPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Angular"
        description="Use io components in Angular standalone projects with the Angular wrapper package for typed bindings and seamless template integration."
        tabs={[]}
      />

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Install
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Install the core Web Components package with the Angular wrapper to get typed component bindings in templates.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`npm install @io-digital/components @io-digital/components-angular`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Component setup
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Import the Angular wrapper components directly into your standalone component&apos;s <code>imports</code> array.
          No <code>NgModule</code> is required.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`// app.component.ts
import { Component } from '@angular/core';
import { IoButtonComponent, IoInputComponent } from '@io-digital/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IoButtonComponent, IoInputComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Template usage
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Use io wrapper components in templates with standard Angular property and event bindings.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`<!-- app.component.html -->
<io-input
  label="Email"
  placeholder="name@example.com"
  [value]="email"
  (change)="onEmailChange($event)"
></io-input>

<io-button variant="solid" (click)="onSubmit()">Submit</io-button>`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Event handling
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          io components emit custom events prefixed with <code>io</code>. The Angular wrapper proxies these as
          typed Angular <code>@Output()</code> emitters so you can bind them with <code>(ioEventName)</code>.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`// app.component.ts
import { Component } from '@angular/core';
import { IoButtonComponent, IoInputComponent } from '@io-digital/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IoButtonComponent, IoInputComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  email = '';

  onEmailChange(event: CustomEvent<{ value: string }>) {
    this.email = event.detail.value;
  }

  onSubmit() {
    console.log('Submitted:', this.email);
  }
}`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          SSR notes
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          When using Angular Universal (SSR), Web Components are only available in the browser.
          Guard any direct element access with <code>isPlatformBrowser</code> and defer loader calls to
          <code>afterNextRender</code> or the <code>ngAfterViewInit</code> lifecycle hook so that the
          server-side render is not affected.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, afterNextRender } from '@angular/core';

export class AppComponent {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        // browser-only Web Component access
      }
    });
  }
}`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Testing
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          In Jest or Web Test Runner environments, Web Components are not registered by default.
          Import the component definitions at the top of your spec file and use <code>TestBed</code> with
          the wrapper component in <code>imports</code>.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IoButtonComponent } from '@io-digital/components-angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, IoButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(fixture.nativeElement.querySelector('io-button')).toBeTruthy();
  });
});`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Troubleshooting
        </h2>
        <div className="space-y-3">
          <div className="rounded-lg p-4" style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              Unknown element errors in templates
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Ensure the wrapper component (e.g. <code>IoButtonComponent</code>) is listed in the
              standalone <code>imports</code> array of every component that uses it.
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              Events not firing
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Custom events dispatched with <code>composed: false</code> do not cross shadow-DOM boundaries.
              Use the <code>(ioEventName)</code> binding on the wrapper component instead of listening on the
              host element directly.
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              Styles not applied
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Import the global stylesheet in your <code>angular.json</code> styles array or in <code>styles.css</code>:
            </p>
            <pre
              className="rounded-lg p-3 text-sm mt-2 overflow-x-auto"
              style={{ background: 'var(--io-bg-base)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
            >
{`@import '@io-digital/components/dist/io/io.css';`}
            </pre>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Next steps
        </h2>
        <ul className="text-sm space-y-2 list-disc list-inside" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          <li>Browse the <a href="/components" style={{ color: 'var(--io-text-link)' }}>component catalogue</a> to see available components and their APIs.</li>
          <li>Check the <a href="/developing/vanilla-js" style={{ color: 'var(--io-text-link)' }}>Vanilla JS guide</a> for CDN usage without a build step.</li>
          <li>Visit the <a href="/styles" style={{ color: 'var(--io-text-link)' }}>styles reference</a> to learn about design tokens and theming.</li>
        </ul>
      </section>
    </div>
  );
}
