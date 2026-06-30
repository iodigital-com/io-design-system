'use client';

import { buttonTileStory, buttonTilePropDefinitions } from '../io-button-tile.stories';
import { Configurator } from '@/components/playground/Configurator';

export default function IoButtonTileConfiguratorPage() {
  return (
    <Configurator
      tagName="io-button-tile"
      story={buttonTileStory}
      propDefinitions={buttonTilePropDefinitions}
    />
  );
}
