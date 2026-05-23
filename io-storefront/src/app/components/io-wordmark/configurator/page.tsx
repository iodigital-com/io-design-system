'use client';

import { wordmarkStory, wordmarkPropDefinitions } from '../io-wordmark.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoWordmarkConfiguratorPage() {
  return (
    <Configurator
      tagName="io-wordmark"
      story={wordmarkStory}
      propDefinitions={wordmarkPropDefinitions}
    />
  );
}
