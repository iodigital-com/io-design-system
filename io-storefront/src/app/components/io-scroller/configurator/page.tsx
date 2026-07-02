'use client';

import { scrollerStory, scrollerPropDefinitions } from '../io-scroller.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoScrollerConfiguratorPage() {
  return (
    <Configurator
      tagName="io-scroller"
      story={scrollerStory}
      propDefinitions={scrollerPropDefinitions}
      previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
    />
  );
}
