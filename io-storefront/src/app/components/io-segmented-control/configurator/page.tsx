'use client';

import { segmentedControlStory, segmentedControlPropDefinitions } from '../io-segmented-control.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoSegmentedControlConfiguratorPage() {
  return (
    <Configurator
      tagName="io-segmented-control"
      story={segmentedControlStory}
      propDefinitions={segmentedControlPropDefinitions}
    />
  );
}
