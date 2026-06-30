'use client';

import { flagStory, flagPropDefinitions } from '../io-flag.stories';
import { Configurator } from '@/components/playground/Configurator';

export default function IoFlagConfiguratorPage() {
  return (
    <Configurator
      tagName="io-flag"
      story={flagStory}
      propDefinitions={flagPropDefinitions}
    />
  );
}
