'use client';

import { linkTileStory, linkTilePropDefinitions } from '../io-link-tile.stories';
import { Configurator } from '@/components/playground/Configurator';

export default function IoLinkTileConfiguratorPage() {
  return (
    <Configurator
      tagName="io-link-tile"
      story={linkTileStory}
      propDefinitions={linkTilePropDefinitions}
    />
  );
}
