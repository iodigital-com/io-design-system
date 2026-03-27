'use client';

import React from 'react';
import { Playground } from './Playground';
import { createElements } from '@/utils/generator/generator';
import { generateHtmlMarkup } from '@/utils/generator/generateHtmlMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import type { Story } from '@/models/story';

type ComponentStoryProps = {
  story: Story<HTMLTagOrComponent>;
  /** Extra class names applied to the Playground preview wrapper. */
  previewClassName?: string;
  /** Inline styles merged into the Playground preview wrapper — use to override background for dark stages. */
  previewStyle?: React.CSSProperties;
};

/**
 * ComponentStory — static read-only demo.
 * Used on Examples pages to show fixed variants without prop controls.
 * Code block is expanded by default.
 */
export function ComponentStory({ story, previewClassName, previewStyle }: ComponentStoryProps) {
  const nodes = story.generator(story.state);
  const preview = createElements(nodes, () => {});
  const frameworkCode = {
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
