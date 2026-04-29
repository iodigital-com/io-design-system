'use client';

import { modalStory, modalPropDefinitions } from '../io-modal.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoModalConfiguratorPage() {
  return (
    <Configurator
      tagName="io-modal"
      story={modalStory}
      propDefinitions={modalPropDefinitions}
    />
  );
}
