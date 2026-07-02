'use client';

import { checkboxGroupStory, checkboxGroupPropDefinitions } from '../io-checkbox-group.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoCheckboxGroupConfiguratorPage() {
  return (
    <Configurator
      tagName="io-checkbox-group"
      story={checkboxGroupStory}
      propDefinitions={checkboxGroupPropDefinitions}
      previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
    />
  );
}
