'use client';

import { tagDismissibleStory, tagDismissiblePropDefinitions } from '../io-tag-dismissible.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTagDismissibleConfiguratorPage() {
  return (
    <Configurator
      tagName="io-tag-dismissible"
      story={tagDismissibleStory}
      propDefinitions={tagDismissiblePropDefinitions}
    />
  );
}
