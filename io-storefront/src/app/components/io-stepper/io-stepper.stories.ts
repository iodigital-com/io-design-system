import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

/**
 * Main configurator story for io-stepper.
 * Renders three io-step children driven by the current prop.
 */
export const stepperStory: Story<'io-stepper'> = {
  state: {
    properties: {
      current: 2,
      orientation: 'horizontal',
      ariaLabel: 'Progress',
    },
  },
  generator: ({ properties } = {}) => {
    const { current = 2, orientation = 'horizontal', ariaLabel = 'Progress' } = (properties ?? {}) as {
      current?: number;
      orientation?: 'horizontal' | 'vertical';
      ariaLabel?: string;
    };

    const numericCurrent = Number(current);
    const getStatus = (idx: number) => {
      if (idx < numericCurrent) return 'complete';
      if (idx === numericCurrent) return 'current';
      return 'upcoming';
    };

    return [
      {
        tag: 'io-stepper' as const,
        properties: { current: numericCurrent, orientation, ariaLabel },
        children: [
          {
            tag: 'io-step' as const,
            properties: { label: 'Account', status: getStatus(1) },
            children: [],
          },
          {
            tag: 'io-step' as const,
            properties: { label: 'Details', status: getStatus(2) },
            children: [],
          },
          {
            tag: 'io-step' as const,
            properties: { label: 'Review', status: getStatus(3) },
            children: [],
          },
        ],
      },
    ];
  },
};

/** Horizontal 3-step with step 2 active. */
export const stepperStoryHorizontal: Story<'io-stepper'> = {
  state: { properties: { current: 2, orientation: 'horizontal' } },
  generator: () => [
    {
      tag: 'io-stepper' as const,
      properties: { current: 2, orientation: 'horizontal' },
      children: [
        { tag: 'io-step' as const, properties: { label: 'Account', status: 'complete' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Details', status: 'current' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Review', status: 'upcoming' }, children: [] },
      ],
    },
  ],
};

/** Vertical 3-step with step 2 active. */
export const stepperStoryVertical: Story<'io-stepper'> = {
  state: { properties: { current: 2, orientation: 'vertical' } },
  generator: () => [
    {
      tag: 'io-stepper' as const,
      properties: { current: 2, orientation: 'vertical' },
      children: [
        { tag: 'io-step' as const, properties: { label: 'Account', status: 'complete' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Details', status: 'current' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Review', status: 'upcoming' }, children: [] },
      ],
    },
  ],
};

/** All three statuses displayed side-by-side. */
export const stepperStoryStatuses: Story<'io-stepper'> = {
  state: { properties: { current: 2 } },
  generator: () => [
    {
      tag: 'io-stepper' as const,
      properties: { current: 2, orientation: 'horizontal' },
      children: [
        { tag: 'io-step' as const, properties: { label: 'Complete', status: 'complete' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Current', status: 'current' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Upcoming', status: 'upcoming' }, children: [] },
      ],
    },
  ],
};

/** Five-step flow. */
export const stepperStoryFiveSteps: Story<'io-stepper'> = {
  state: { properties: { current: 3, orientation: 'horizontal' } },
  generator: () => [
    {
      tag: 'io-stepper' as const,
      properties: { current: 3, orientation: 'horizontal' },
      children: [
        { tag: 'io-step' as const, properties: { label: 'Cart', status: 'complete' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Shipping', status: 'complete' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Payment', status: 'current' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Review', status: 'upcoming' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Confirm', status: 'upcoming' }, children: [] },
      ],
    },
  ],
};


/** Step with warning status — use when a step requires attention before proceeding. */
export const stepperStoryWarning: Story<'io-stepper'> = {
  state: { properties: { current: 2, orientation: 'horizontal' } },
  generator: () => [
    {
      tag: 'io-stepper' as const,
      properties: { current: 2, orientation: 'horizontal' },
      children: [
        { tag: 'io-step' as const, properties: { label: 'Account', status: 'complete' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Details', status: 'warning' }, children: [] },
        { tag: 'io-step' as const, properties: { label: 'Review', status: 'upcoming' }, children: [] },
      ],
    },
  ],
};

/**
 * Prop definitions for the Configurator controls panel.
 */
export const stepperPropDefinitions: PropDefinition[] = [
  {
    name: 'current',
    type: 'number',
    defaultValue: 1,
    description: 'The 1-based index of the current active step.',
    group: 'Behaviour',
  },
  {
    name: 'orientation',
    type: 'select',
    options: ['horizontal', 'vertical'],
    defaultValue: 'horizontal',
    description: 'Layout direction of the stepper.',
    group: 'Appearance',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: 'Progress',
    description: 'Accessible label for the <nav> landmark. Override for i18n.',
    group: 'Accessibility',
  },
];
