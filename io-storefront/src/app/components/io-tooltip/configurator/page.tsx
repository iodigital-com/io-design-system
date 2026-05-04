'use client';

import { tooltipStory, tooltipPropDefinitions } from '../io-tooltip.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTooltipConfiguratorPage() {
  return (
    <Configurator
      tagName="io-tooltip"
      story={tooltipStory}
      propDefinitions={tooltipPropDefinitions}
    />
  );
}
