'use client';

import { headingStory, headingPropDefinitions } from '../io-heading.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoHeadingConfiguratorPage() {
  return (
    <Configurator
      tagName="io-heading"
      story={headingStory}
      propDefinitions={headingPropDefinitions}
    />
  );
}
