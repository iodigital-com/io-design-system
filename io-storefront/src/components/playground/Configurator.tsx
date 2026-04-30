'use client';

import React, { useEffect, useState, type ReactNode } from 'react';

import { ConfiguratorControls } from './ConfiguratorControls';
import { Playground } from './Playground';

import type { FrameworkCode } from '@/models/framework';
import type { PropDefinition } from '@/models/propDefinition';
import type { Story, StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateHtmlMarkup } from '@/utils/generator/generateHtmlMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import { createElements } from '@/utils/generator/generator';


type ConfiguratorProps = {
  tagName: HTMLTagOrComponent;
  story: Story<HTMLTagOrComponent>;
  propDefinitions: PropDefinition[];
  /** Extra class names forwarded to the Playground preview wrapper. */
  previewClassName?: string;
  /** Inline styles merged into the Playground preview wrapper — use to override background for components that need a plain stage. */
  previewStyle?: React.CSSProperties;
};

/**
 * Configurator — stateful interactive demo.
 *
 *  - Holds `exampleState` (current prop values)
 *  - Re-runs `story.generator(exampleState)` on every change
 *  - Passes the result to `createElements()` for the live preview
 *  - Passes the result to `generateHtmlMarkup()` for the code block
 */
export function Configurator({ story, propDefinitions, previewClassName, previewStyle }: ConfiguratorProps) {
  const [exampleState, setExampleState] = useState<StoryState<HTMLTagOrComponent>>(
    story.state ?? {},
  );
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(story.generator(story.state), setExampleState),
  );
  const [frameworkCode, setFrameworkCode] = useState<FrameworkCode>(() => {
    if (typeof story.frameworkCode === 'function') return story.frameworkCode(story.state);
    if (story.frameworkCode) return story.frameworkCode;
    const g = story.generator(story.state);
    return {
      html: generateHtmlMarkup(g),
      react: generateReactMarkup(g),
      angular: generateAngularMarkup(g),
      vue: generateVueMarkup(g),
    };
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: state change drives re-render
  useEffect(() => {
    const generated = story.generator(exampleState);
    setExampleElement(createElements(generated, setExampleState));
    if (typeof story.frameworkCode === 'function') {
      setFrameworkCode(story.frameworkCode(exampleState));
    } else if (story.frameworkCode) {
      setFrameworkCode(story.frameworkCode);
    } else {
      setFrameworkCode({
        html: generateHtmlMarkup(generated),
        react: generateReactMarkup(generated),
        angular: generateAngularMarkup(generated),
        vue: generateVueMarkup(generated),
      });
    }
  }, [exampleState]);

  return (
    <div>
      <Playground frameworkCode={frameworkCode} previewClassName={previewClassName} previewStyle={previewStyle}>{exampleElement}</Playground>
      <ConfiguratorControls
        propDefinitions={propDefinitions}
        storyState={exampleState}
        setStoryState={setExampleState}
      />
    </div>
  );
}
