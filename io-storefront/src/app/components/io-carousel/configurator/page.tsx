'use client';

import { carouselStory, carouselPropDefinitions } from '../io-carousel.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoCarouselConfiguratorPage() {
  return (
    <div>
      <Configurator
        tagName="io-carousel"
        story={carouselStory}
        propDefinitions={carouselPropDefinitions}
      />
    </div>
  );
}
