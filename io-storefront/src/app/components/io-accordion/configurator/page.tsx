'use client';

import { Configurator } from '@/components/playground/Configurator';
import { accordionStory, accordionPropDefinitions } from '../io-accordion.stories';

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
