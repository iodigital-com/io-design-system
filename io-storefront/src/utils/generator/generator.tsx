'use client';

import React, { type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { StoryState } from '@/models/story';

/**
 * io Design System — Component Tag Registry + Element Generator
 * ==============================================================
 *
 * ⚠️  GOVERNANCE (RULE 3): When you add a new io-* Web Component, you MUST:
 *   1. Add its tag name to the IoTagNames union below
 *   2. Add the JSX element signature to custom-elements.d.ts
 *   3. NEVER use @ts-expect-error to suppress custom element typing
 */

/** All io component tag names. Extend this union as new components are built. */
export type IoTagNames =
  | 'io-button'
  | 'io-badge'
  | 'io-input'
  | 'io-link'
  | 'io-tag'
  | 'io-checkbox'
  | 'io-select'
  | 'io-textarea'
  | 'io-spinner'
  | 'io-radio'
  | 'io-tabs'
  | 'io-modal'
  | 'io-tooltip'
  | 'io-toast'
  | 'io-toast-item';

/** All HTML intrinsic + io component tags that a story can reference. */
export type HTMLTagOrComponent = IoTagNames | keyof React.JSX.IntrinsicElements;

// ---------------------------------------------------------------------------
// ElementConfig — describes a single node in a story element tree
// ---------------------------------------------------------------------------

export type ElementConfig<T extends HTMLTagOrComponent> = {
  tag: T;
  /** Props/attributes; use JSX key conventions (className, htmlFor, …). */
  properties?: Record<string, unknown>;
  /** Stencil custom event handlers: key is the JSX event name (e.g. onClick). */
  events?: Record<string, EventConfig>;
  children?: (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
};

/** Describes a state update triggered by a component event. */
export type EventConfig = {
  /** Tag name of the element whose state should be updated. */
  target: string;
  /** Property key to update on that element's state. */
  prop: string;
  /** Static value to set (mutually exclusive with eventValueKey). */
  value?: unknown;
  /** Key to read from `event.detail` (e.g. 'open'). */
  eventValueKey?: string;
  /** Negate the incoming value before setting (useful for toggles). */
  negateValue?: boolean;
};

// ---------------------------------------------------------------------------
// createElements — render an ElementConfig tree as React nodes
// ---------------------------------------------------------------------------

type SetState = Dispatch<SetStateAction<StoryState<HTMLTagOrComponent>>>;

let _keyCounter = 0;

/**
 * Converts an array of `ElementConfig` objects into React elements.
 * All `io-*` tags are rendered as native custom elements — React 19
 * supports custom elements with full attribute/event pass-through without
 * any wrapper component.
 *
 * @param nodes   - output of story.generator()
 * @param setState - Configurator's state setter (wired to EventConfig handlers)
 */
export function createElements(
  nodes: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  setState: SetState,
): ReactNode {
  _keyCounter = 0;
  return nodes.map((node) => createElement(node, setState));
}

function createElement(
  node: string | ElementConfig<HTMLTagOrComponent> | undefined,
  setState: SetState,
  parentIsCustomEl = false,
): ReactNode {
  if (node === undefined) return null;
  if (typeof node === 'string') return node;

  const { tag, properties = {}, events = {}, children = [] } = node;

  // Build event handler props from EventConfig
  const eventProps: Record<string, (e: CustomEvent) => void> = {};
  for (const [eventName, config] of Object.entries(events)) {
    eventProps[eventName] = (e: CustomEvent) => {
      setState((prev) => {
        const current = prev.properties ?? {};
        let newValue: unknown;
        if (config.eventValueKey !== undefined) {
          newValue = (e.detail as Record<string, unknown>)[config.eventValueKey];
        } else {
          newValue = config.value;
        }
        if (config.negateValue) newValue = !newValue;
        return {
          ...prev,
          properties: { ...current, [config.prop]: newValue },
        };
      });
    };
  }

  const key = `el-${_keyCounter++}`;

  // React 19 custom element support: pass all props directly.
  // suppressHydrationWarning: React SSR converts camelCase props to kebab-case
  // attributes for custom elements, but client-side React does not, causing
  // a hydration mismatch. Suppress the warning since Stencil manages its own
  // attribute reflection after hydration.
  const isCustomEl = typeof tag === 'string' && tag.includes('-');
  const suppressHydration = isCustomEl || parentIsCustomEl;
  return React.createElement(
    tag as string,
    { key, ...(suppressHydration ? { suppressHydrationWarning: true } : {}), ...properties, ...eventProps },
    ...children.map((child) => createElement(child, setState, isCustomEl)),
  );
}
