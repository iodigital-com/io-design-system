'use client';

import { linkTileStory, linkTilePropDefinitions } from '../io-link-tile.stories';
import { Configurator } from '@/components/playground/Configurator';
import { TILE_PREVIEW_CLASSNAME } from '@/components/playground/preview-styles';

export default function IoLinkTileConfiguratorPage() {
  return (
    <Configurator
      tagName="io-link-tile"
      story={linkTileStory}
      propDefinitions={linkTilePropDefinitions}
      previewClassName={TILE_PREVIEW_CLASSNAME}
    />
  );
}
