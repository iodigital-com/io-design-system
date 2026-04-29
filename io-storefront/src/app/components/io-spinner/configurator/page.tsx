'use client';

import { spinnerStory, spinnerPropDefinitions } from '../io-spinner.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoSpinnerConfiguratorPage() {
  return (
    <Configurator
      tagName="io-spinner"
      story={spinnerStory}
      propDefinitions={spinnerPropDefinitions}
    />
  );
}
