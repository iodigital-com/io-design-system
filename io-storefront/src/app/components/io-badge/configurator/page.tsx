'use client';

import { badgeStory, badgePropDefinitions } from '../io-badge.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoBadgeConfiguratorPage() {
  return (
    <Configurator
      tagName="io-badge"
      story={badgeStory}
      propDefinitions={badgePropDefinitions}
    />
  );
}
