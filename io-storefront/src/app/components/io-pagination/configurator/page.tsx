'use client';

import { paginationStory, paginationPropDefinitions } from '../io-pagination.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoPaginationConfiguratorPage() {
  return (
    <Configurator
      tagName="io-pagination"
      story={paginationStory}
      propDefinitions={paginationPropDefinitions}
    />
  );
}
