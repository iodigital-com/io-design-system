'use client';

import { textareaStory, textareaPropDefinitions } from '../io-textarea.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTextareaConfiguratorPage() {
  return (
    <Configurator
      tagName="io-textarea"
      story={textareaStory}
      propDefinitions={textareaPropDefinitions}
    />
  );
}
