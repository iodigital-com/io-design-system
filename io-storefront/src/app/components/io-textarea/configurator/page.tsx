'use client';

import { Configurator } from '@/components/playground/Configurator';
import { textareaStory, textareaPropDefinitions } from '../io-textarea.stories';

export default function IoTextareaConfiguratorPage() {
  return (
    <Configurator
      tagName="io-textarea"
      story={textareaStory}
      propDefinitions={textareaPropDefinitions}
    />
  );
}
