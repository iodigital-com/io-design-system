'use client';

import { radioStory, radioPropDefinitions } from '../io-radio.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoRadioConfiguratorPage() {
  return (
    <Configurator
      tagName="io-radio"
      story={radioStory}
      propDefinitions={radioPropDefinitions}
    />
  );
}
