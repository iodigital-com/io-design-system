'use client';

import { textStory, textPropDefinitions } from '../io-text.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTextConfiguratorPage() {
  return (
    <Configurator
      tagName="io-text"
      story={textStory}
      propDefinitions={textPropDefinitions}
    />
  );
}
