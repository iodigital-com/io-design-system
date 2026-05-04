'use client';

import React, { type Dispatch, type ReactNode, type SetStateAction } from 'react';

import type { StoryState } from '@/models/story';
import type { IoTagNames } from '@/types/io-tag-names.generated';

/**
 * io Design System — Component Tag Registry + Element Generator
 * ==============================================================
 *
 * ⚠️  GOVERNANCE (RULE 3): io-* tag names and React JSX custom element typings
 * are generated from Stencil output by scripts/sync-stencil-assets.cjs.
 * NEVER use @ts-expect-error to suppress custom element typing drift.
 */

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
type CustomListenerStore = Array<{ eventName: string; handler: EventListener }>;

type StoryHostElement = HTMLElement & {
  __ioStoryListeners?: CustomListenerStore;
  [key: string]: unknown;
};

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

  const isCustomEl = typeof tag === 'string' && tag.includes('-');

  // Build event handlers from EventConfig
  const eventProps: Record<string, (e: CustomEvent) => void> = {};
  for (const [eventName, config] of Object.entries(events)) {
    const handler = (e: CustomEvent) => {
      setState((prev) => {
        const current = prev.properties ?? {};
        let newValue: unknown;
        if (config.eventValueKey !== undefined) {
          newValue = (e.detail as Record<string, unknown> | undefined)?.[config.eventValueKey];
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

    eventProps[eventName] = handler;
  }

  const key = `el-${_keyCounter++}`;

  // React 19 custom element support: pass all props directly.
  // suppressHydrationWarning: React SSR converts camelCase props to kebab-case
  // attributes for custom elements, but client-side React does not, causing
  // a hydration mismatch. Suppress the warning since Stencil manages its own
  // attribute reflection after hydration.
  const suppressHydration = isCustomEl || parentIsCustomEl;

  const customRef = isCustomEl
    ? (el: StoryHostElement | null) => {
        if (!el) return;

        const previous = el.__ioStoryListeners ?? [];
        previous.forEach(({ eventName, handler }) => el.removeEventListener(eventName, handler));

        const next: CustomListenerStore = Object.entries(eventProps).map(([eventName, handler]) => {
          const domEventName =
            eventName.startsWith('on') && eventName.length > 2
              ? eventName.slice(2, 3).toLowerCase() + eventName.slice(3)
              : eventName;

          el.addEventListener(domEventName, handler as EventListener);
          return { eventName: domEventName, handler: handler as EventListener };
        });

        el.__ioStoryListeners = next;

        // Apply custom-element properties directly on each render. This avoids
        // React normalizing certain prop names (e.g. size, iconOnly) in ways
        // that can prevent Stencil props from updating correctly.
        // Hyphenated names (e.g. io-tooltip, data-*) are HTML attributes and
        // must use setAttribute — Stencil props are always camelCase/lowercase.
        for (const [propName, propValue] of Object.entries(properties)) {
          if (propName.includes('-')) {
            if (propValue === null || propValue === undefined || propValue === false) {
              el.removeAttribute(propName);
            } else {
              el.setAttribute(propName, String(propValue));
            }
          } else {
            el[propName] = propValue;
          }
        }
      }
    : undefined;

  const elementProps = isCustomEl
    ? {
        key,
        ...(suppressHydration ? { suppressHydrationWarning: true } : {}),
        ...(customRef ? { ref: customRef } : {}),
      }
    : {
        key,
        ...(suppressHydration ? { suppressHydrationWarning: true } : {}),
        ...properties,
        ...eventProps,
      };

  return React.createElement(tag as string, elementProps, ...children.map((child) => createElement(child, setState, isCustomEl)));
}
