'use client';

import { Configurator } from '@/components/playground/Configurator';
import { checkboxStory, checkboxPropDefinitions } from '../io-checkbox.stories';

export default function IoCheckboxConfiguratorPage() {
  return (
    <Configurator
      tagName="io-checkbox"
      story={checkboxStory}
      propDefinitions={checkboxPropDefinitions}
    />
  );
}
