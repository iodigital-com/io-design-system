'use client';

import { Configurator } from '@/components/playground/Configurator';
import { linkStory, linkPropDefinitions } from '../io-link.stories';

export default function IoLinkConfiguratorPage() {
  return (
    <Configurator
      tagName="io-link"
      story={linkStory}
      propDefinitions={linkPropDefinitions}
    />
  );
}
