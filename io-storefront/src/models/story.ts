import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Story<Tag> — describes a component demo that can be both rendered (React)
 * and serialised to HTML markup.
 */
export type Story<Tag extends HTMLTagOrComponent> = {
  name?: string;
  /** Initial state displayed when the page loads (optional for static stories). */
  state?: StoryState<Tag>;
  /**
   * Pure function: given current state → returns the element tree to render.
   * Returning the same shape for every call allows both the live preview and
   * the code-block generator to work from a single source of truth.
   */
  generator: (state?: StoryState<Tag>) => (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
};

/** The mutable state managed by the Configurator. */
export type StoryState<Tag extends HTMLTagOrComponent> = {
  /** Component properties (JSX key names, real TS types). */
  properties?: Partial<Record<string, unknown>>;
  /** Which slot variant is currently selected, keyed by slot name. */
  slots?: Partial<Record<string, Story<HTMLTagOrComponent>>>;
};

/** All named slot variants available for a component. */
export type SlotStories<Tag extends HTMLTagOrComponent> = {
  [slotName: string]: {
    [storyName: string]: Story<Tag>;
  };
};
