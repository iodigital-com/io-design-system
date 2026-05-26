'use client';

import { popoverStory, popoverPropDefinitions } from '../io-popover.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoPopoverConfiguratorPage() {
  return (
    <Configurator
      tagName="io-popover"
      story={popoverStory}
      propDefinitions={popoverPropDefinitions}
    />
  );
}
