import type { FrameworkCode } from '@/models/framework';
import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

// ── Framework code overrides ──────────────────────────────────────────────────

const defaultCode: FrameworkCode = {
  html: `<io-fieldset label="Shipping address">
  <io-input label="Street" name="street"></io-input>
  <io-input label="City" name="city"></io-input>
</io-fieldset>`,
  react: `import { IoFieldset, IoInput } from '@iodigital-com/components-react';

export function App() {
  return (
    <IoFieldset label="Shipping address">
      <IoInput label="Street" name="street" />
      <IoInput label="City" name="city" />
    </IoFieldset>
  );
}`,
  angular: `<io-fieldset label="Shipping address">
  <io-input label="Street" name="street"></io-input>
  <io-input label="City" name="city"></io-input>
</io-fieldset>`,
  vue: `<template>
  <io-fieldset label="Shipping address">
    <io-input label="Street" name="street" />
    <io-input label="City" name="city" />
  </io-fieldset>
</template>`,
};

const errorCode: FrameworkCode = {
  html: `<io-fieldset label="Notification preferences" error error-message="Please select at least one option">
  <io-checkbox label="Email" name="notif" value="email"></io-checkbox>
  <io-checkbox label="SMS" name="notif" value="sms"></io-checkbox>
</io-fieldset>`,
  react: `import { IoFieldset, IoCheckbox } from '@iodigital-com/components-react';

export function App() {
  return (
    <IoFieldset label="Notification preferences" error errorMessage="Please select at least one option">
      <IoCheckbox label="Email" name="notif" value="email" />
      <IoCheckbox label="SMS" name="notif" value="sms" />
    </IoFieldset>
  );
}`,
  angular: `<io-fieldset label="Notification preferences" [error]="true" error-message="Please select at least one option">
  <io-checkbox label="Email" name="notif" value="email"></io-checkbox>
  <io-checkbox label="SMS" name="notif" value="sms"></io-checkbox>
</io-fieldset>`,
  vue: `<template>
  <io-fieldset label="Notification preferences" :error="true" error-message="Please select at least one option">
    <io-checkbox label="Email" name="notif" value="email" />
    <io-checkbox label="SMS" name="notif" value="sms" />
  </io-fieldset>
</template>`,
};

// ── Stories ───────────────────────────────────────────────────────────────────

/**
 * Configurator story — allows toggling label, required, error, and errorMessage.
 * frameworkCode is a function so the code tabs reflect current prop values.
 */
export const fieldsetStory: Story<'io-fieldset'> = {
  state: {
    properties: {
      label: 'Shipping address',
      required: false,
      error: false,
      errorMessage: '',
    },
  },
  generator: ({ properties } = {}) => {
    const label = (properties?.label as string) ?? 'Shipping address';
    const required = (properties?.required as boolean) ?? false;
    const error = (properties?.error as boolean) ?? false;
    const errorMessage = (properties?.errorMessage as string) || undefined;

    return [
      {
        tag: 'io-fieldset' as const,
        properties: {
          label,
          ...(required ? { required: true } : {}),
          ...(error ? { error: true } : {}),
          ...(error && errorMessage ? { errorMessage } : {}),
        },
        children: [
          {
            tag: 'io-input' as const,
            properties: { label: 'Street', name: 'street' },
          },
          {
            tag: 'io-input' as const,
            properties: { label: 'City', name: 'city' },
          },
        ],
      },
    ];
  },
  frameworkCode: ({ properties } = {}) => {
    const label = (properties?.label as string) ?? 'Shipping address';
    const required = (properties?.required as boolean) ?? false;
    const error = (properties?.error as boolean) ?? false;
    const errorMessage = (properties?.errorMessage as string) || undefined;

    const attrs = [
      `label="${label}"`,
      required ? 'required' : null,
      error ? 'error' : null,
      error && errorMessage ? `error-message="${errorMessage}"` : null,
    ]
      .filter(Boolean)
      .join(' ');

    const reactProps = [
      `label="${label}"`,
      required ? 'required' : null,
      error ? 'error' : null,
      error && errorMessage ? `errorMessage="${errorMessage}"` : null,
    ]
      .filter(Boolean)
      .join(' ');

    const htmlTag = `<io-fieldset ${attrs}>\n  <io-input label="Street" name="street"></io-input>\n  <io-input label="City" name="city"></io-input>\n</io-fieldset>`;
    return {
      html: htmlTag,
      react: `import { IoFieldset, IoInput } from '@iodigital-com/components-react';\n\nexport function App() {\n  return (\n    <IoFieldset ${reactProps}>\n      <IoInput label="Street" name="street" />\n      <IoInput label="City" name="city" />\n    </IoFieldset>\n  );\n}`,
      angular: htmlTag,
      vue: `<template>\n  <io-fieldset ${attrs}>\n    <io-input label="Street" name="street" />\n    <io-input label="City" name="city" />\n  </io-fieldset>\n</template>`,
    };
  },
};

/** Default fieldset with two inputs */
export const fieldsetStoryDefault: Story<'io-fieldset'> = {
  generator: () => [
    {
      tag: 'io-fieldset' as const,
      properties: { label: 'Shipping address' },
      children: [
        { tag: 'io-input' as const, properties: { label: 'Street', name: 'street' } },
        { tag: 'io-input' as const, properties: { label: 'City', name: 'city' } },
      ],
    },
  ],
  frameworkCode: defaultCode,
};

/** Fieldset in error state with error message */
export const fieldsetStoryError: Story<'io-fieldset'> = {
  generator: () => [
    {
      tag: 'io-fieldset' as const,
      properties: {
        label: 'Notification preferences',
        error: true,
        errorMessage: 'Please select at least one option',
      },
      children: [
        { tag: 'io-checkbox' as const, properties: { label: 'Email', name: 'notif', value: 'email' } },
        { tag: 'io-checkbox' as const, properties: { label: 'SMS', name: 'notif', value: 'sms' } },
      ],
    },
  ],
  frameworkCode: errorCode,
};

/** Required fieldset */
export const fieldsetStoryRequired: Story<'io-fieldset'> = {
  generator: () => [
    {
      tag: 'io-fieldset' as const,
      properties: { label: 'Contact details', required: true },
      children: [
        { tag: 'io-input' as const, properties: { label: 'Name', name: 'name', required: true } },
        { tag: 'io-input' as const, properties: { label: 'Email', name: 'email', required: true } },
      ],
    },
  ],
  frameworkCode: {
    html: `<io-fieldset label="Contact details" required>
  <io-input label="Name" name="name" required></io-input>
  <io-input label="Email" name="email" required></io-input>
</io-fieldset>`,
    react: `import { IoFieldset, IoInput } from '@iodigital-com/components-react';

export function App() {
  return (
    <IoFieldset label="Contact details" required>
      <IoInput label="Name" name="name" required />
      <IoInput label="Email" name="email" required />
    </IoFieldset>
  );
}`,
    angular: `<io-fieldset label="Contact details" required>
  <io-input label="Name" name="name" required></io-input>
  <io-input label="Email" name="email" required></io-input>
</io-fieldset>`,
    vue: `<template>
  <io-fieldset label="Contact details" required>
    <io-input label="Name" name="name" required />
    <io-input label="Email" name="email" required />
  </io-fieldset>
</template>`,
  },
};

export const fieldsetPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Fieldset label',
    description: 'Legend text — provides the accessible name for the group.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a decorative * indicator in the legend. Does not propagate required to children.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: false,
    description: 'Puts the fieldset in error state — changes legend color and adds an error border.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    defaultValue: '',
    description: 'Error text rendered below the group when error=true. Empty value suppresses the error paragraph.',
  },
];
