'use client';

import { SectionHeader, InlineCode, ApiTable } from '@/components/api/ApiPrimitives';
import { PageHeader } from '@/components/layout/PageHeader';

export default function StoriesPage() {
  const storyTypeCode = `import type { IoTagNames } from '@/types/io-tag-names.generated';
import type React from 'react';

/** All HTML intrinsic + io component tags that a story can reference. */
export type HTMLTagOrComponent = IoTagNames | keyof React.JSX.IntrinsicElements;

export type ElementConfig<T extends HTMLTagOrComponent> = {
  tag: T;
  properties?: Record<string, unknown>;
  events?: Record<string, EventConfig>;
  children?: (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
};

export type Story<Tag extends HTMLTagOrComponent> = {
  name?: string;
  state?: StoryState<Tag>;
  frameworkCode?: FrameworkCode | ((state?: StoryState<Tag>) => FrameworkCode);
  generator: (state?: StoryState<Tag>) => (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
};

export type StoryState<Tag extends HTMLTagOrComponent> = {
  properties?: Partial<Record<string, unknown>>;
  slots?: Partial<Record<string, Story<HTMLTagOrComponent>>>;
};`;

  const propDefinitionCode = `import type { PropDefinition } from '@/models/propDefinition';

export type PropDefinition =
  | (BasePropDefinition & { type: 'boolean'; defaultValue?: boolean })
  | (BasePropDefinition & { type: 'number'; defaultValue?: number })
  | (BasePropDefinition & { type: 'string'; defaultValue?: string })
  | (BasePropDefinition & { type: 'select'; options: string[]; defaultValue?: string });

type BasePropDefinition = {
  name: string;
  group?: string;
  description?: string;
};`;

  const buttonStoryCode = `import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

// ── Configurator story (interactive) ─────────────────────────────────────────
export const buttonStory: Story<'io-button'> = {
  state: {
    properties: {
      variant: 'solid',
      color: 'blue',
      size: 'md',
      arrow: undefined,
      disabled: false,
      loading: false,
      fullWidth: false,
      iconOnly: false,
      label: 'Click me',
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Click me', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    if (attrs['arrow'] === 'none') attrs['arrow'] = null;
    const content = attrs['iconOnly'] ? '×' : (label as string);
    return [
      {
        tag: 'io-button' as const,
        properties: attrs,
        children: [content],
      },
    ];
  },
};

// ── Static stories (examples page) ───────────────────────────────────────────
export const buttonStorySolid: Story<'io-button'> = {
  state: { properties: { variant: 'solid', color: 'blue', arrow: 'forward' } },
  generator: () =>
    (['blue', 'white', 'black', 'antraciet', 'orange'] as const).map((color) => ({
      tag: 'io-button' as const,
      properties: { variant: 'solid', color, arrow: 'forward' },
      children: [color.charAt(0).toUpperCase() + color.slice(1)],
    })),
};

// ── Prop definitions for ConfiguratorControls ─────────────────────────────────
export const buttonPropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['solid', 'ghost'],
    defaultValue: 'solid',
    description: 'Chooses the visual button style.',
    group: 'Appearance',
  },
  {
    name: 'color',
    type: 'select',
    options: ['blue', 'white', 'black', 'antraciet', 'orange', 'pink', 'rouge', 'yellow', 'beige', 'grey'],
    defaultValue: 'blue',
    description: 'Sets the button colour token.',
    group: 'Appearance',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disables interaction and applies disabled styling.',
    group: 'State',
  },
];`;

  const configuratorPageCode = `'use client';

import { buttonStory, buttonPropDefinitions } from '../io-button.stories';
import { Configurator } from '@/components/playground/Configurator';

export default function IoButtonConfiguratorPage() {
  return (
    <Configurator
      tagName="io-button"
      story={buttonStory}
      propDefinitions={buttonPropDefinitions}
    />
  );
}`;

  const examplesPageCode = `'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  buttonStorySolid,
  buttonStoryGhost,
  buttonStorySizes,
  buttonStoryArrows,
  buttonStoryStates,
  buttonStoryLoading,
  buttonStoryIconOnly,
} from '../io-button.stories';

export default function IoButtonExamplesPage() {
  return (
    <div className="space-y-12">
      <ComponentStory title="Solid colours" story={buttonStorySolid} />
      <ComponentStory title="Ghost variants" story={buttonStoryGhost} />
      <ComponentStory title="Sizes" story={buttonStorySizes} />
      <ComponentStory title="Arrow directions" story={buttonStoryArrows} />
      <ComponentStory title="Disabled + Loading" story={buttonStoryStates}
        previewStyle={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--io-space-2, 8px)' }}
      />
      <ComponentStory title="Loading" story={buttonStoryLoading} />
      <ComponentStory title="Icon only" story={buttonStoryIconOnly} />
    </div>
  );
}`;

  const newStoryVariantCode = `/** Full-width button — shows how fullWidth stretches the button. */
export const buttonStoryFullWidth: Story<'io-button'> = {
  state: { properties: { variant: 'solid', color: 'blue', fullWidth: true } },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { variant: 'solid', color: 'blue', fullWidth: true },
      children: ['Full width'],
    },
  ],
};`;

  const newComponentStoriesCode = `import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const myComponentStory: Story<'io-my-component'> = {
  state: {
    properties: {
      label: 'Hello',
      disabled: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-my-component' as const,
      properties: properties ?? {},
      children: [String((properties?.label as string | undefined) ?? 'Hello')],
    },
  ],
};

export const myComponentPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Hello',
    description: 'The label text.',
    group: 'Content',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disables the component.',
    group: 'State',
  },
];`;

  return (
    <div className="space-y-16">
      <PageHeader
        title="Stories — Interactive Demo Strategy"
        description="How the storefront uses stories.ts files to power both the live Configurator and static Examples pages from a single source of truth."
        tabs={[]}
      />

      <section id="overview" className="space-y-6">
        <SectionHeader
          title="Overview"
          description="A story is a pure function that describes what a component should render given a set of props."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          Every component in the storefront has a <InlineCode>*.stories.ts</InlineCode> file alongside
          its page directories. That file exports one or more <InlineCode>Story</InlineCode> objects and
          a <InlineCode>PropDefinition[]</InlineCode> array. These two exports are the only contracts
          between a component page and the interactive tooling.
        </p>
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          The same story is consumed in two places. The Configurator tab renders it with live controls —
          changing a property in the sidebar re-runs the generator and updates the preview and all four
          framework code blocks simultaneously. The Examples tab renders static snapshots using a subset
          of the same story objects, without controls.
        </p>
        <div
          className="p-4 rounded-lg"
          style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--io-text-primary)' }}>
            Single source of truth
          </p>
          <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
            The <InlineCode>generator</InlineCode> function returns an <InlineCode>ElementConfig[]</InlineCode> array.
            That same array is passed to <InlineCode>createElements()</InlineCode> for the React preview,
            and to <InlineCode>generateHtmlMarkup()</InlineCode>, <InlineCode>generateReactMarkup()</InlineCode>,{' '}
            <InlineCode>generateAngularMarkup()</InlineCode>, and <InlineCode>generateVueMarkup()</InlineCode> for
            the four code tabs. The markup never drifts from the live demo.
          </p>
        </div>
      </section>

      <section id="story-type" className="space-y-6">
        <SectionHeader
          title="Story type contract"
          description="The Story<Tag> generic and its companion StoryState<Tag> are defined in src/models/story.ts."
        />
        <pre
          className="text-xs font-mono leading-6 p-5 rounded-lg overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
          {storyTypeCode}
        </pre>
        <ApiTable
          columns={[
            { label: 'Field', width: '200px' },
            { label: 'Required', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="name">name</InlineCode>,
              'optional',
              'Human-readable label used when a story is listed in a selection UI.',
            ],
            [
              <InlineCode key="state">state</InlineCode>,
              'optional',
              'Initial StoryState loaded when the Configurator tab mounts. Omit for static-only stories that never need controls.',
            ],
            [
              <InlineCode key="frameworkCode">frameworkCode</InlineCode>,
              'optional',
              'Override the auto-generated framework markup. Accepts a static FrameworkCode object or a function that receives the current StoryState and returns one. When absent, all four framework tabs are generated automatically from the ElementConfig tree.',
            ],
            [
              <InlineCode key="generator">generator</InlineCode>,
              'required',
              'Pure function that receives the current StoryState and returns an ElementConfig array. Must be side-effect-free — it is called on every state change.',
            ],
          ]}
        />
      </section>

      <section id="prop-definition" className="space-y-6">
        <SectionHeader
          title="PropDefinition — control schema"
          description="The PropDefinition[] array describes the controls panel rendered in the right sidebar on the Configurator tab."
        />
        <pre
          className="text-xs font-mono leading-6 p-5 rounded-lg overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
          {propDefinitionCode}
        </pre>
        <ApiTable
          columns={[
            { label: 'type', width: '120px' },
            { label: 'Control rendered' },
          ]}
          rows={[
            [<InlineCode key="boolean">boolean</InlineCode>, 'Toggle switch'],
            [<InlineCode key="string">string</InlineCode>, 'Text input'],
            [<InlineCode key="number">number</InlineCode>, 'Number input'],
            [
              <InlineCode key="select">select</InlineCode>,
              'Segmented control (options.length <= 5) or dropdown select (options.length > 5)',
            ],
          ]}
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          The <InlineCode>group</InlineCode> field is optional. Props sharing the same group value are
          rendered under a common section header in the controls panel. Props without a group appear
          first at the top of the panel. The <InlineCode>description</InlineCode> field populates the
          tooltip shown on the info icon next to each control label.
        </p>
      </section>

      <section id="button-walkthrough" className="space-y-6">
        <SectionHeader
          title="Annotated io-button.stories.ts walkthrough"
          description="A full stories file shows both the interactive configurator story and a set of static example stories."
        />
        <pre
          className="text-xs font-mono leading-6 p-5 rounded-lg overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
          {buttonStoryCode}
        </pre>
        <div className="space-y-3">
          <div
            className="p-4 rounded-lg"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              buttonStory — interactive
            </p>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              The <InlineCode>state</InlineCode> field seeds the Configurator with the initial prop
              values. The generator destructures <InlineCode>properties</InlineCode> from the current
              state on every call. The special handling for{' '}
              <InlineCode>{'arrow === \'none\''}</InlineCode> shows how to translate a UI-friendly sentinel
              value into a DOM-property reset: passing <InlineCode>null</InlineCode> tells the React
              ref callback to clear the property without emitting it in generated markup.
            </p>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              buttonStorySolid — static
            </p>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              Static stories ignore <InlineCode>state</InlineCode> entirely. The generator receives no
              argument and returns a fixed array of <InlineCode>ElementConfig</InlineCode> objects —
              one per colour variant. The Examples page renders them all at once inside a{' '}
              <InlineCode>ComponentStory</InlineCode> wrapper, producing a live preview and a
              multi-element code block.
            </p>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              buttonPropDefinitions — control schema
            </p>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              Each entry maps one-to-one to a <InlineCode>@Prop()</InlineCode> declaration in the
              Stencil component. The <InlineCode>name</InlineCode> value must match the JSX prop name
              exactly (camelCase). The Configurator reads the current value for each name from{' '}
              <InlineCode>storyState.properties</InlineCode> and passes updates back via the{' '}
              <InlineCode>setStoryState</InlineCode> setter.
            </p>
          </div>
        </div>
      </section>

      <section id="add-variant" className="space-y-6">
        <SectionHeader
          title="How to add a story variant to an existing component"
          description="Step-by-step guide for extending a component that already has a stories.ts file."
        />
        <ol className="space-y-6 text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <li className="flex gap-3">
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                border: '1px solid var(--io-accent)',
              }}
            >
              1
            </span>
            <div>
              <strong style={{ color: 'var(--io-text-primary)' }}>Open the stories file.</strong>{' '}
              Navigate to{' '}
              <InlineCode>io-storefront/src/app/components/io-{'{name}'}/io-{'{name}'}.stories.ts</InlineCode>.
            </div>
          </li>
          <li className="flex gap-3">
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                border: '1px solid var(--io-accent)',
              }}
            >
              2
            </span>
            <div>
              <strong style={{ color: 'var(--io-text-primary)' }}>Add a new exported Story.</strong>{' '}
              Write a generator that returns the <InlineCode>ElementConfig[]</InlineCode> for the
              variant. Keep it pure — no side effects, no imports from React.
              <pre
                className="mt-3 text-xs font-mono leading-6 p-4 rounded-lg overflow-x-auto"
                style={{
                  background: 'var(--io-bg-raised)',
                  border: '1px solid var(--io-border)',
                  color: 'var(--io-text-secondary)',
                }}
              >
                {newStoryVariantCode}
              </pre>
            </div>
          </li>
          <li className="flex gap-3">
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                border: '1px solid var(--io-accent)',
              }}
            >
              3
            </span>
            <div>
              <strong style={{ color: 'var(--io-text-primary)' }}>Import and render in the examples page.</strong>{' '}
              Open{' '}
              <InlineCode>io-storefront/src/app/components/io-{'{name}'}/examples/page.tsx</InlineCode>,
              import the new story, and add a <InlineCode>{'<ComponentStory>'}</InlineCode> block. Use
              the <InlineCode>previewStyle</InlineCode> prop when the variant needs a non-default layout
              (e.g. column direction for stacked states).
            </div>
          </li>
          <li className="flex gap-3">
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                border: '1px solid var(--io-accent)',
              }}
            >
              4
            </span>
            <div>
              <strong style={{ color: 'var(--io-text-primary)' }}>Verify.</strong>{' '}
              Run <InlineCode>npm run dev</InlineCode> from the repo root and navigate to the component
              examples page in the browser. Confirm the new story renders correctly and its generated
              code blocks are accurate.
            </div>
          </li>
        </ol>
      </section>

      <section id="wire-new-component" className="space-y-6">
        <SectionHeader
          title="How to wire a new component's storefront page"
          description="Step-by-step guide for connecting a brand new component to the interactive demo system."
        />
        <ol className="space-y-6 text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <li className="flex gap-3">
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                border: '1px solid var(--io-accent)',
              }}
            >
              1
            </span>
            <div>
              <strong style={{ color: 'var(--io-text-primary)' }}>Create the stories file.</strong>{' '}
              Add{' '}
              <InlineCode>io-storefront/src/app/components/io-{'{name}'}/io-{'{name}'}.stories.ts</InlineCode>.
              Export at least one interactive story, one or more static stories for the examples page,
              and a <InlineCode>PropDefinition[]</InlineCode> for the controls panel.
              <pre
                className="mt-3 text-xs font-mono leading-6 p-4 rounded-lg overflow-x-auto"
                style={{
                  background: 'var(--io-bg-raised)',
                  border: '1px solid var(--io-border)',
                  color: 'var(--io-text-secondary)',
                }}
              >
                {newComponentStoriesCode}
              </pre>
            </div>
          </li>
          <li className="flex gap-3">
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                border: '1px solid var(--io-accent)',
              }}
            >
              2
            </span>
            <div>
              <strong style={{ color: 'var(--io-text-primary)' }}>Create the configurator page.</strong>{' '}
              Add{' '}
              <InlineCode>io-storefront/src/app/components/io-{'{name}'}/configurator/page.tsx</InlineCode>.
              Import the interactive story and the prop definitions, then render a single{' '}
              <InlineCode>{'<Configurator>'}</InlineCode> component.
              <pre
                className="mt-3 text-xs font-mono leading-6 p-4 rounded-lg overflow-x-auto"
                style={{
                  background: 'var(--io-bg-raised)',
                  border: '1px solid var(--io-border)',
                  color: 'var(--io-text-secondary)',
                }}
              >
                {configuratorPageCode}
              </pre>
            </div>
          </li>
          <li className="flex gap-3">
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                border: '1px solid var(--io-accent)',
              }}
            >
              3
            </span>
            <div>
              <strong style={{ color: 'var(--io-text-primary)' }}>Create the examples page.</strong>{' '}
              Add{' '}
              <InlineCode>io-storefront/src/app/components/io-{'{name}'}/examples/page.tsx</InlineCode>.
              Import the static stories and render each one inside a{' '}
              <InlineCode>{'<ComponentStory>'}</InlineCode> block with a descriptive title.
              <pre
                className="mt-3 text-xs font-mono leading-6 p-4 rounded-lg overflow-x-auto"
                style={{
                  background: 'var(--io-bg-raised)',
                  border: '1px solid var(--io-border)',
                  color: 'var(--io-text-secondary)',
                }}
              >
                {examplesPageCode}
              </pre>
            </div>
          </li>
          <li className="flex gap-3">
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                border: '1px solid var(--io-accent)',
              }}
            >
              4
            </span>
            <div>
              <strong style={{ color: 'var(--io-text-primary)' }}>Register in sitemap.ts.</strong>{' '}
              Add the component entry to{' '}
              <InlineCode>io-storefront/src/sitemap.ts</InlineCode> under the{' '}
              <InlineCode>Components</InlineCode> section. The{' '}
              <InlineCode>href</InlineCode> must point to the configurator page (e.g.{' '}
              <InlineCode>/components/io-my-component/configurator</InlineCode>) and both{' '}
              <InlineCode>slug</InlineCode> and <InlineCode>description</InlineCode> must be provided
              to satisfy the <InlineCode>ComponentNavItem</InlineCode> type guard.
            </div>
          </li>
          <li className="flex gap-3">
            <span
              className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                border: '1px solid var(--io-accent)',
              }}
            >
              5
            </span>
            <div>
              <strong style={{ color: 'var(--io-text-primary)' }}>Run the quality gate.</strong>{' '}
              From the repo root, run{' '}
              <InlineCode>npm run governance:check && npm run type-check && npm run build:storefront</InlineCode>.
              Resolve any errors before merging.
            </div>
          </li>
        </ol>
      </section>

      <section id="configurator-internals" className="space-y-6">
        <SectionHeader
          title="How Configurator.tsx reads story metadata"
          description="The Configurator component owns all mutable state and orchestrates the full interactive demo loop."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          On mount, Configurator seeds <InlineCode>exampleState</InlineCode> from{' '}
          <InlineCode>story.state</InlineCode>, runs{' '}
          <InlineCode>story.generator(story.state)</InlineCode> to produce the initial{' '}
          <InlineCode>ElementConfig[]</InlineCode>, and derives the four framework code strings from
          that array. Every time <InlineCode>exampleState</InlineCode> changes — triggered by a control
          interaction in ConfiguratorControls — a <InlineCode>useEffect</InlineCode> re-runs the
          generator and refreshes both the live preview and all code blocks.
        </p>
        <ApiTable
          columns={[
            { label: 'Step', width: '200px' },
            { label: 'Where it happens' },
          ]}
          rows={[
            [
              'Seed initial state',
              <span key="seed" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>useState(story.state ?? {})</InlineCode> in Configurator.tsx
              </span>,
            ],
            [
              'User changes a control',
              <span key="change" style={{ color: 'var(--io-text-secondary)' }}>
                ConfiguratorControls calls{' '}
                <InlineCode>setStoryState(prev =&gt; ({'{...prev, properties: {...prev.properties, [name]: value}}'}))</InlineCode>
              </span>,
            ],
            [
              'Re-run generator',
              <span key="regen" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>useEffect([exampleState])</InlineCode> calls{' '}
                <InlineCode>story.generator(exampleState)</InlineCode>
              </span>,
            ],
            [
              'Update live preview',
              <span key="preview" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>createElements(generated, setExampleState)</InlineCode> → React nodes rendered in Playground
              </span>,
            ],
            [
              'Update code blocks',
              <span key="code" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>generateHtmlMarkup()</InlineCode> / <InlineCode>generateReactMarkup()</InlineCode> / etc. → FrameworkCode state
              </span>,
            ],
            [
              'Portal controls',
              <span key="portal" style={{ color: 'var(--io-text-secondary)' }}>
                ConfiguratorControls portals into <InlineCode>#io-sidebar-end</InlineCode> when the right sidebar is open
              </span>,
            ],
          ]}
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          The <InlineCode>frameworkCode</InlineCode> override on a Story lets you supply hand-authored
          markup for frameworks where the auto-generated output is incomplete or requires extra context
          (e.g. Angular module declarations, Vue composition API setup). When the override is a
          function, Configurator calls it with the current state so the override can still be reactive.
        </p>
      </section>

      <section id="conventions" className="space-y-6">
        <SectionHeader
          title="Conventions and constraints"
          description="Rules that keep stories predictable and consistent across all components."
        />
        <ul className="space-y-3 text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <li>
            <strong style={{ color: 'var(--io-text-primary)' }}>Generators are pure.</strong>{' '}
            No React imports, no side effects. A generator must return the same output for the same
            input — this guarantees the code block always matches the live preview.
          </li>
          <li>
            <strong style={{ color: 'var(--io-text-primary)' }}>Use <InlineCode>as const</InlineCode> on tag names.</strong>{' '}
            Writing <InlineCode>{'tag: \'io-button\' as const'}</InlineCode> narrows the type to the
            specific literal so TypeScript can check the properties object against the component's
            published prop types via the JSX intrinsic element registry.
          </li>
          <li>
            <strong style={{ color: 'var(--io-text-primary)' }}>Sentinel values for optional props.</strong>{' '}
            When a prop is optional and the control needs a "none" option, use a sentinel string
            (e.g. <InlineCode>'none'</InlineCode>) and convert it to <InlineCode>null</InlineCode> or{' '}
            <InlineCode>undefined</InlineCode> inside the generator before building the{' '}
            <InlineCode>ElementConfig</InlineCode>. The code generators filter out{' '}
            <InlineCode>null</InlineCode> values automatically.
          </li>
          <li>
            <strong style={{ color: 'var(--io-text-primary)' }}>Keep PropDefinition in sync with Stencil @Prop.</strong>{' '}
            The <InlineCode>name</InlineCode> field must exactly match the camelCase JSX prop name.
            The <InlineCode>defaultValue</InlineCode> should mirror the <InlineCode>@Prop()</InlineCode>{' '}
            default in the Stencil component.
          </li>
          <li>
            <strong style={{ color: 'var(--io-text-primary)' }}>Group related props.</strong>{' '}
            Use the <InlineCode>group</InlineCode> field to cluster props under section headers in the
            controls panel. Conventional group names are{' '}
            <InlineCode>Appearance</InlineCode>, <InlineCode>Content</InlineCode>, and{' '}
            <InlineCode>State</InlineCode>.
          </li>
          <li>
            <strong style={{ color: 'var(--io-text-primary)' }}>Static stories do not need a state field.</strong>{' '}
            If a story is only used on the examples page and never in a Configurator, omit{' '}
            <InlineCode>state</InlineCode>. The generator receives <InlineCode>undefined</InlineCode>{' '}
            and should ignore it.
          </li>
        </ul>
      </section>
    </div>
  );
}
