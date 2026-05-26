'use client';

import { pinCodeStory, pinCodePropDefinitions } from '../io-pin-code.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoPinCodeConfiguratorPage() {
  return (
    <Configurator
      tagName="io-pin-code"
      story={pinCodeStory}
      propDefinitions={pinCodePropDefinitions}
    />
  );
}
