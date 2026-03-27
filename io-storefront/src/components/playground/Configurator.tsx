'use client';

import React, { useEffect, useState, type ReactNode } from 'react';
import { Playground } from './Playground';
import { ConfiguratorControls } from './ConfiguratorControls';
import { createElements } from '@/utils/generator/generator';
import { generateHtmlMarkup } from '@/utils/generator/generateHtmlMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import type { Story, StoryState } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { FrameworkCode } from '@/models/framework';

type ConfiguratorProps = {
  tagName: HTMLTagOrComponent;
  story: Story<HTMLTagOrComponent>;
  propDefinitions: PropDefinition[];
  /** Extra class names forwarded to the Playground preview wrapper. */
  previewClassName?: string;
};

/**
 * Configurator — stateful interactive demo.
 *
 *  - Holds `exampleState` (current prop values)
 *  - Re-runs `story.generator(exampleState)` on every change
 *  - Passes the result to `createElements()` for the live preview
 *  - Passes the result to `generateHtmlMarkup()` for the code block
 */
export function Configurator({ story, propDefinitions, previewClassName }: ConfiguratorProps) {
  const [exampleState, setExampleState] = useState<StoryState<HTMLTagOrComponent>>(
    story.state ?? {},
  );
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(story.generator(story.state), setExampleState),
  );
  const [frameworkCode, setFrameworkCode] = useState<FrameworkCode>(() => {
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
    setFrameworkCode({
      html: generateHtmlMarkup(generated),
      react: generateReactMarkup(generated),
      angular: generateAngularMarkup(generated),
      vue: generateVueMarkup(generated),
    });
  }, [exampleState]);

  return (
    <div>
      <Playground frameworkCode={frameworkCode} previewClassName={previewClassName}>{exampleElement}</Playground>
      <ConfiguratorControls
        propDefinitions={propDefinitions}
        storyState={exampleState}
        setStoryState={setExampleState}
      />
    </div>
  );
}
