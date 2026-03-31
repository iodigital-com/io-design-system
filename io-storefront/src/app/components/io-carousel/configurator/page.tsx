'use client';

import { Configurator } from '@/components/playground/Configurator';
import { carouselStory, carouselPropDefinitions } from '../io-carousel.stories';

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
