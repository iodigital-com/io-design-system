'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { C, CodeSnippet, StepBlock } from '@/components/developing/DevelopingPrimitives';

export default function DevelopingVanillaJsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Vanilla JS"
        description="Use io components as standard Web Components with HTML and JavaScript, without framework wrappers."
        tabs={[]}
      />

      <StepBlock
        title="Install"
        description="Use npm in bundler projects, or import from CDN for static pages."
      >
        <CodeSnippet>{`# npm
npm install @io-digital/components

# or CDN
<script type="module" src="https://cdn.jsdelivr.net/npm/@io-digital/components/dist/io/io.esm.js"></script>`}</CodeSnippet>
      </StepBlock>

      <StepBlock
        title="Basic usage"
        description={<>After the package is loaded, use <C>io-*</C> tags directly in your markup.</>}
      >
        <CodeSnippet>{`<io-button variant="solid">Click me</io-button>
<io-input label="Email" placeholder="name@example.com"></io-input>`}</CodeSnippet>
      </StepBlock>
    </div>
  );
}
