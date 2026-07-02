'use client';

import { fieldsetStory, fieldsetPropDefinitions } from '../io-fieldset.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoFieldsetConfiguratorPage() {
  return (
    <Configurator
      tagName="io-fieldset"
      story={fieldsetStory}
      propDefinitions={fieldsetPropDefinitions}
    />
  );
}
