'use client';

import { gridStory, gridPropDefinitions } from '../io-grid.stories';
import { Configurator } from '@/components/playground/Configurator';

export default function IoGridConfiguratorPage() {
  return (
    <Configurator
      tagName="io-grid"
      story={gridStory}
      propDefinitions={gridPropDefinitions}
    />
  );
}
