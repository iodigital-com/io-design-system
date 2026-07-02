'use client';

import { productTileStory, productTilePropDefinitions } from '../io-product-tile.stories';
import { Configurator } from '@/components/playground/Configurator';

export default function IoProductTileConfiguratorPage() {
  return (
    <Configurator
      tagName="io-product-tile"
      story={productTileStory}
      propDefinitions={productTilePropDefinitions}
    />
  );
}
