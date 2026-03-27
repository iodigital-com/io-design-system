'use client';

import { Configurator } from '@/components/playground/Configurator';
import { modalStory, modalPropDefinitions } from '../io-modal.stories';

export default function IoModalConfiguratorPage() {
  return (
    <Configurator
      tagName="io-modal"
      story={modalStory}
      propDefinitions={modalPropDefinitions}
    />
  );
}
