'use client';

import { radioGroupStory, radioGroupPropDefinitions } from '../io-radio-group.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoRadioGroupConfiguratorPage() {
  return (
    <Configurator
      tagName="io-radio-group"
      story={radioGroupStory}
      propDefinitions={radioGroupPropDefinitions}
      previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
    />
  );
}
