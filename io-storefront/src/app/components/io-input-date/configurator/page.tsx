'use client';

import { inputDateStory, inputDatePropDefinitions } from '../io-input-date.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoInputDateConfiguratorPage() {
  return (
    <Configurator
      tagName="io-input-date"
      story={inputDateStory}
      propDefinitions={inputDatePropDefinitions}
    />
  );
}
