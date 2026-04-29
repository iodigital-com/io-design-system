'use client';

import { tagStory, tagPropDefinitions } from '../io-tag.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTagConfiguratorPage() {
  return (
    <Configurator
      tagName="io-tag"
      story={tagStory}
      propDefinitions={tagPropDefinitions}
    />
  );
}
