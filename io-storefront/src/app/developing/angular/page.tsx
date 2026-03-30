'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="rounded-lg p-4 text-sm overflow-x-auto"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
    >
      <code>{children}</code>
    </pre>
  );
}

export default function DevelopingAngularPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Angular"
        description="Use io components in Angular projects via the Angular wrapper package. Each component is available as a standalone directive with typed inputs and outputs."
        tabs={[]}
      />

      <Section id="install" title="Install">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Install the core components package and the Angular wrapper.
        </p>
        <CodeBlock>{`npm install @io-digital/components @io-digital/components-angular`}</CodeBlock>
      </Section>

      <Section id="styles" title="Load styles">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Add the component stylesheet to the <code>styles</code> array in <code>angular.json</code>, or import it in your root stylesheet.
        </p>
        <CodeBlock>{`// angular.json
"styles": [
  "node_modules/@io-digital/components/dist/io-components/io-components.css",
  "src/styles.css"
]`}</CodeBlock>
      </Section>

      <Section id="setup" title="Register components">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Import the wrapper directives you need directly into your standalone component or shared module. Each wrapper is a standalone Angular directive.
        </p>
        <CodeBlock>{`import { Component } from '@angular/core';
import { IoButton, IoInput } from '@io-digital/components-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [IoButton, IoInput],
  template: \`
    <io-input label="Email" placeholder="name@example.com"></io-input>
    <io-button color="blue" variant="solid" (ioClick)="onSubmit()">
      Submit
    </io-button>
  \`,
})
export class ExampleComponent {
  onSubmit() {
    console.log('submitted');
  }
}`}</CodeBlock>
      </Section>

      <Section id="events" title="Binding events">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Custom events emitted by io components are exposed as Angular <code>@Output()</code> bindings on the wrapper directives. Bind them using standard Angular event syntax.
        </p>
        <CodeBlock>{`import { Component } from '@angular/core';
import { IoCheckbox } from '@io-digital/components-angular';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [IoCheckbox],
  template: \`
    <io-checkbox
      label="Subscribe to updates"
      [checked]="subscribed"
      (ioChange)="onToggle($event)"
    ></io-checkbox>
  \`,
})
export class SubscribeComponent {
  subscribed = false;

  onToggle(event: CustomEvent<{ checked: boolean }>) {
    this.subscribed = event.detail.checked;
  }
}`}</CodeBlock>
      </Section>

      <Section id="requirements" title="Requirements">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Angular 17 or later is required. The wrapper package ships as an ES module and relies on standalone component patterns introduced in Angular 15.
        </p>
      </Section>

    </div>
  );
}
