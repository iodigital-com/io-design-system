'use client';

import { accordionStory, accordionPropDefinitions } from '../io-accordion.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoAccordionConfiguratorPage() {
  return (
    <div>
      <Configurator
        tagName="io-accordion"
        story={accordionStory}
        propDefinitions={accordionPropDefinitions}
      />
    </div>
  );
}
