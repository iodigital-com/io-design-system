'use client';

import React from 'react';

import { SectionHeader } from '@/components/usage/UsagePrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { PageHeader } from '@/components/layout/PageHeader';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const loginFormStory: Story<'io-input'> = {
  state: { properties: {} },
  generator: () =>
    [
      {
        tag: 'io-input' as const,
        properties: { label: 'Email address', type: 'email', name: 'email' },
      },
      {
        tag: 'io-input' as const,
        properties: { label: 'Password', type: 'password', name: 'password' },
      },
      {
        tag: 'io-checkbox' as const,
        properties: { label: 'Remember me', name: 'remember' },
      },
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid', color: 'blue', fullWidth: true },
        children: ['Sign in'],
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

const confirmationModalStory: Story<'io-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid', color: 'blue' },
        children: ['Delete account'],
        events: { onClick: { target: 'io-modal', prop: 'open', value: true } },
      },
      {
        tag: 'io-modal' as const,
        properties: { open, heading: 'Confirm deletion', size: 'sm' },
        children: [
          {
            tag: 'div' as const,
            properties: {
              style: 'display:flex;flex-direction:column;gap:var(--io-space-3,12px);align-items:center',
            },
            children: [
              {
                tag: 'io-spinner' as const,
                properties: { size: 'md', color: 'primary', label: 'Processing' },
              },
              {
                tag: 'p' as const,
                children: [
                  'This will permanently delete your account and all associated data.',
                ],
              },
            ],
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost', color: 'blue' },
            children: ['Cancel'],
            events: { onClick: { target: 'io-modal', prop: 'open', value: false } },
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'solid', color: 'rouge' },
            children: ['Delete'],
            events: { onClick: { target: 'io-modal', prop: 'open', value: false } },
          },
        ],
        events: { onDismiss: { target: 'io-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

const dataTableStory: Story<'io-badge'> = {
  state: { properties: {} },
  generator: () =>
    [
      {
        tag: 'div' as const,
        properties: {
          style:
            'width:100%;border:1px solid var(--io-border);border-radius:var(--io-border-radius-sm,9px);overflow:hidden',
        },
        children: [
          {
            tag: 'div' as const,
            properties: {
              style:
                'display:grid;grid-template-columns:1fr 120px 120px;padding:var(--io-space-2,8px) var(--io-space-4,16px);background:var(--io-bg-raised);border-bottom:1px solid var(--io-border);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--io-text-secondary)',
            },
            children: ['Name', 'Status', 'Actions'],
          },
          {
            tag: 'div' as const,
            properties: {
              style:
                'display:grid;grid-template-columns:1fr 120px 120px;align-items:center;padding:var(--io-space-2,8px) var(--io-space-4,16px);background:var(--io-bg-base);border-bottom:1px solid var(--io-border);font-size:13px;color:var(--io-text-primary)',
            },
            children: [
              'Alice Johnson',
              {
                tag: 'io-badge' as const,
                properties: { variant: 'success', size: 'sm' },
                children: ['Active'],
              },
              {
                tag: 'io-button' as const,
                properties: { variant: 'ghost', color: 'blue', size: 'sm' },
                children: ['Edit'],
              },
            ],
          },
          {
            tag: 'div' as const,
            properties: {
              style:
                'display:grid;grid-template-columns:1fr 120px 120px;align-items:center;padding:var(--io-space-2,8px) var(--io-space-4,16px);background:var(--io-bg-raised);border-bottom:1px solid var(--io-border);font-size:13px;color:var(--io-text-primary)',
            },
            children: [
              'Bob Smith',
              {
                tag: 'io-badge' as const,
                properties: { variant: 'warning', size: 'sm' },
                children: ['Pending'],
              },
              {
                tag: 'io-button' as const,
                properties: { variant: 'ghost', color: 'blue', size: 'sm' },
                children: ['Edit'],
              },
            ],
          },
          {
            tag: 'div' as const,
            properties: {
              style:
                'display:grid;grid-template-columns:1fr 120px 120px;align-items:center;padding:var(--io-space-2,8px) var(--io-space-4,16px);background:var(--io-bg-base);font-size:13px;color:var(--io-text-primary)',
            },
            children: [
              'Carol White',
              {
                tag: 'io-badge' as const,
                properties: { variant: 'error', size: 'sm' },
                children: ['Inactive'],
              },
              {
                tag: 'io-button' as const,
                properties: { variant: 'ghost', color: 'blue', size: 'sm' },
                children: ['Edit'],
              },
            ],
          },
          {
            tag: 'div' as const,
            properties: {
              style:
                'display:flex;justify-content:flex-end;padding:var(--io-space-2,8px) var(--io-space-4,16px);background:var(--io-bg-raised);border-top:1px solid var(--io-border)',
            },
            children: [
              {
                tag: 'io-pagination' as const,
                properties: { page: 1, totalPages: 4 },
              },
            ],
          },
        ],
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

const notificationStory: Story<'io-toast-item'> = {
  state: { properties: {} },
  generator: () =>
    [
      {
        tag: 'div' as const,
        properties: {
          style:
            'display:flex;flex-direction:column;gap:var(--io-space-3,12px);width:100%;max-width:360px',
        },
        children: [
          {
            tag: 'io-toast-item' as const,
            properties: { variant: 'success', text: 'Profile updated successfully.' },
          },
          {
            tag: 'io-toast-item' as const,
            properties: {
              variant: 'error',
              text: 'Failed to save changes. Please try again.',
            },
          },
          {
            tag: 'io-toast-item' as const,
            properties: {
              variant: 'warning',
              text: 'Your session expires in 5 minutes.',
            },
          },
          {
            tag: 'io-toast-item' as const,
            properties: { variant: 'info', text: 'A new version is available.' },
          },
        ],
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

const multiStepFormStory: Story<'io-stepper'> = {
  state: { properties: { step: 1 } },
  generator: ({ properties } = {}) => {
    const step = Number((properties ?? {})['step'] ?? 1);
    const getStatus = (idx: number) => {
      if (idx < step) return 'complete';
      if (idx === step) return 'current';
      return 'upcoming';
    };
    return [
      {
        tag: 'div' as const,
        properties: {
          style:
            'display:flex;flex-direction:column;gap:var(--io-space-4,16px);width:100%;max-width:420px',
        },
        children: [
          {
            tag: 'io-stepper' as const,
            properties: { current: step, orientation: 'horizontal' },
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
          {
            tag: 'io-input' as const,
            properties: { label: 'Email address', type: 'email', name: 'email' },
          },
          {
            tag: 'io-input' as const,
            properties: { label: 'Password', type: 'password', name: 'password' },
          },
          {
            tag: 'io-select' as const,
            properties: { label: 'Country', name: 'country' },
            children: [
              {
                tag: 'io-option' as const,
                properties: { value: 'nl', label: 'Netherlands' },
              },
              {
                tag: 'io-option' as const,
                properties: { value: 'be', label: 'Belgium' },
              },
              {
                tag: 'io-option' as const,
                properties: { value: 'de', label: 'Germany' },
              },
            ],
          },
          {
            tag: 'div' as const,
            properties: {
              style: 'display:flex;flex-direction:column;gap:var(--io-space-2,8px)',
            },
            children: [
              {
                tag: 'io-radio' as const,
                properties: {
                  label: 'Standard delivery',
                  name: 'delivery',
                  checked: true,
                },
              },
              {
                tag: 'io-radio' as const,
                properties: { label: 'Express delivery', name: 'delivery' },
              },
            ],
          },
          {
            tag: 'io-button' as const,
            properties: {
              variant: 'solid',
              color: 'blue',
              arrow: 'forward',
              fullWidth: true,
            },
            children: ['Continue'],
          },
        ],
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

const FORM_PREVIEW_STYLE: React.CSSProperties = {
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: 'var(--io-space-3, 12px)',
  maxWidth: '360px',
};

export default function PatternsPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Composition Patterns"
        description="Real-world examples showing how io components work together to build common UI patterns."
        tabs={[]}
      />

      <section id="login-form" className="space-y-6">
        <SectionHeader
          title="Login form"
          description="Combine io-input fields for email and password with an io-checkbox for persistent sessions and an io-button to submit. Use the loading prop on the button to signal an in-flight request."
        />
        <ComponentStory story={loginFormStory} previewStyle={FORM_PREVIEW_STYLE} />
      </section>

      <section id="confirmation-modal" className="space-y-6">
        <SectionHeader
          title="Confirmation modal"
          description="An io-button triggers an io-modal that presents a brief io-spinner alongside a warning message. Footer slots hold the cancel and destructive action buttons."
        />
        <ComponentStory story={confirmationModalStory} interactive />
      </section>

      <section id="data-table-actions" className="space-y-6">
        <SectionHeader
          title="Data table actions"
          description="Pair io-badge status indicators in a table status column with io-button row actions. Attach io-pagination to the card footer to let users move between pages without leaving the current view."
        />
        <ComponentStory story={dataTableStory} />
      </section>

      <section id="notification-pattern" className="space-y-6">
        <SectionHeader
          title="Notification pattern"
          description="Use io-toast-item directly to display pre-rendered notifications. Each variant maps to a semantic feedback level — success, error, warning, and info — keeping status communication consistent."
        />
        <ComponentStory story={notificationStory} />
      </section>

      <section id="multi-step-form" className="space-y-6">
        <SectionHeader
          title="Multi-step form"
          description="An io-stepper tracks the user's position across a multi-section form built from io-input, io-select, and io-radio. Each io-step reflects complete, current, or upcoming state as the user progresses."
        />
        <ComponentStory
          story={multiStepFormStory}
          previewStyle={{
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 'var(--io-space-3, 12px)',
            maxWidth: '420px',
          }}
        />
      </section>
    </div>
  );
}
