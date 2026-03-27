'use client';

import { Configurator } from '@/components/playground/Configurator';
import { tooltipStory, tooltipPropDefinitions } from '../io-tooltip.stories';

export default function IoTooltipConfiguratorPage() {
  return (
    <Configurator
      tagName="io-tooltip"
      story={tooltipStory}
      propDefinitions={tooltipPropDefinitions}
    />
  );
}
