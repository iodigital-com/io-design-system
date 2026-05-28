'use client';

import { Configurator } from '@/components/configurator/Configurator';

import { inlineBannerPropDefinitions, inlineBannerStory } from '../io-inline-banner.stories';

export default function IoInlineBannerConfiguratorPage() {
  return <Configurator story={inlineBannerStory} propDefinitions={inlineBannerPropDefinitions} />;
}
