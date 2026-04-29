'use client';

import { linkStory, linkPropDefinitions } from '../io-link.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoLinkConfiguratorPage() {
  return (
    <Configurator
      tagName="io-link"
      story={linkStory}
      propDefinitions={linkPropDefinitions}
    />
  );
}
