'use client';

import { multiSelectStory, multiSelectPropDefinitions } from '../io-multi-select.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoMultiSelectConfiguratorPage() {
  return (
    <Configurator
      tagName="io-multi-select"
      story={multiSelectStory}
      propDefinitions={multiSelectPropDefinitions}
      previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
    />
  );
}
