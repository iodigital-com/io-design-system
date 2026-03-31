'use client';

import { Configurator } from '@/components/playground/Configurator';
import { paginationStory, paginationPropDefinitions } from '../io-pagination.stories';

export default function IoPaginationConfiguratorPage() {
  return (
    <Configurator
      tagName="io-pagination"
      story={paginationStory}
      propDefinitions={paginationPropDefinitions}
    />
  );
}
