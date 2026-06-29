'use client';

import { textListStory, textListPropDefinitions } from '../io-text-list.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTextListConfiguratorPage() {
  return (
    <Configurator
      tagName="io-text-list"
      story={textListStory}
      propDefinitions={textListPropDefinitions}
    />
  );
}
