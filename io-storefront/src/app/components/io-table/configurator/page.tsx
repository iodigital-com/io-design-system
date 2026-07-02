'use client';

import { tableStory, tablePropDefinitions } from '../io-table.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTableConfiguratorPage() {
  return (
    <Configurator
      tagName="io-table"
      story={tableStory}
      propDefinitions={tablePropDefinitions}
      previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
    />
  );
}
