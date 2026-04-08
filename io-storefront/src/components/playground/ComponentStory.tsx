'use client';

import React from 'react';
import { Playground } from './Playground';
import { createElements } from '@/utils/generator/generator';
import { generateHtmlMarkup } from '@/utils/generator/generateHtmlMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import type { Story, StoryState } from '@/models/story';

type ComponentStoryProps = {
  story: Story<HTMLTagOrComponent>;
  /** Extra class names applied to the Playground preview wrapper. */
  previewClassName?: string;
  /** Inline styles merged into the Playground preview wrapper — use to override background for dark stages. */
  previewStyle?: React.CSSProperties;
  /** Enables local interactive state so story EventConfig handlers can update preview state. */
  interactive?: boolean;
};

/**
 * ComponentStory — static by default, optionally interactive.
 * Used on Examples pages to show fixed variants; can opt-in to local state
 * so EventConfig interactions are demonstrable.
 */
export function ComponentStory({ story, previewClassName, previewStyle, interactive = false }: ComponentStoryProps) {
  const baseState = React.useMemo(
    () => ((story.state ?? {}) as StoryState<HTMLTagOrComponent>),
    [story],
  );

  const [localState, setLocalState] = React.useState<StoryState<HTMLTagOrComponent>>(baseState);

  React.useEffect(() => {
    setLocalState(baseState);
  }, [baseState]);

  const state = interactive ? localState : baseState;
  const nodes = story.generator(state);
  const noopSetState: React.Dispatch<React.SetStateAction<StoryState<HTMLTagOrComponent>>> = () => undefined;
  const preview = createElements(nodes, interactive ? setLocalState : noopSetState);
  const frameworkCode =
    typeof story.frameworkCode === 'function'
      ? story.frameworkCode(story.state)
      : story.frameworkCode ?? {
          html: generateHtmlMarkup(nodes),
          react: generateReactMarkup(nodes),
          angular: generateAngularMarkup(nodes),
          vue: generateVueMarkup(nodes),
        };

  return (
    <Playground frameworkCode={frameworkCode} codeVisible previewClassName={previewClassName} previewStyle={previewStyle}>
      {preview}
    </Playground>
  );
}
