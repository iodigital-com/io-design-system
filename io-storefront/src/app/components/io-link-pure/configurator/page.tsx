'use client';

import { linkPureStory, linkPurePropDefinitions } from '../io-link-pure.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoLinkPureConfiguratorPage() {
  return (
    <Configurator
      tagName="io-link-pure"
      story={linkPureStory}
      propDefinitions={linkPurePropDefinitions}
    />
  );
}
