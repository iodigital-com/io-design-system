'use client';

import { progressStory, progressPropDefinitions } from '../io-progress.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoProgressConfiguratorPage() {
  return (
    <Configurator
      tagName="io-progress"
      story={progressStory}
      propDefinitions={progressPropDefinitions}
    />
  );
}
