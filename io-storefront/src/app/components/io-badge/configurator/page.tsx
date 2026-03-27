'use client';

import { Configurator } from '@/components/playground/Configurator';
import { badgeStory, badgePropDefinitions } from '../io-badge.stories';

export default function IoBadgeConfiguratorPage() {
  return (
    <Configurator
      tagName="io-badge"
      story={badgeStory}
      propDefinitions={badgePropDefinitions}
    />
  );
}
