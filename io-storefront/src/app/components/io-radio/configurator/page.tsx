'use client';

import { Configurator } from '@/components/playground/Configurator';
import { radioStory, radioPropDefinitions } from '../io-radio.stories';

export default function IoRadioConfiguratorPage() {
  return (
    <Configurator
      tagName="io-radio"
      story={radioStory}
      propDefinitions={radioPropDefinitions}
    />
  );
}
