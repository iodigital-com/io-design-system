'use client';

import { Configurator } from '@/components/playground/Configurator';
import { spinnerStory, spinnerPropDefinitions } from '../io-spinner.stories';

export default function IoSpinnerConfiguratorPage() {
  return (
    <Configurator
      tagName="io-spinner"
      story={spinnerStory}
      propDefinitions={spinnerPropDefinitions}
    />
  );
}
