'use client';

import { checkboxStory, checkboxPropDefinitions } from '../io-checkbox.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoCheckboxConfiguratorPage() {
  return (
    <Configurator
      tagName="io-checkbox"
      story={checkboxStory}
      propDefinitions={checkboxPropDefinitions}
    />
  );
}
