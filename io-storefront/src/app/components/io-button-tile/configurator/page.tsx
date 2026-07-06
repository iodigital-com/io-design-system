'use client';

import { buttonTileStory, buttonTilePropDefinitions } from '../io-button-tile.stories';
import { Configurator } from '@/components/playground/Configurator';
import { TILE_PREVIEW_CLASSNAME } from '@/components/playground/preview-styles';

export default function IoButtonTileConfiguratorPage() {
  return (
    <Configurator
      tagName="io-button-tile"
      story={buttonTileStory}
      propDefinitions={buttonTilePropDefinitions}
      previewClassName={TILE_PREVIEW_CLASSNAME}
    />
  );
}
