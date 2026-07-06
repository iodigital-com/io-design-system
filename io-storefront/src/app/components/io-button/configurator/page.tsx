'use client';

import { buttonStory, buttonPropDefinitions } from '../io-button.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoButtonConfiguratorPage() {
  return (
    <Configurator
      tagName="io-button"
      story={buttonStory}
      propDefinitions={buttonPropDefinitions}
      previewClassName="[&_io-button]:self-center"
    />
  );
}
