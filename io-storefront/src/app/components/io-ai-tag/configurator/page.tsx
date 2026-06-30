'use client';

import { aiTagStory, aiTagPropDefinitions } from '../io-ai-tag.stories';
import { Configurator } from '@/components/playground/Configurator';

export default function IoAiTagConfiguratorPage() {
  return (
    <Configurator
      tagName="io-ai-tag"
      story={aiTagStory}
      propDefinitions={aiTagPropDefinitions}
    />
  );
}
