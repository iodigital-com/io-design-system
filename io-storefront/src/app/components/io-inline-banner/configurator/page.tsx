'use client';

import { Configurator } from '@/components/playground/Configurator';

import { inlineBannerPropDefinitions, inlineBannerStory } from '../io-inline-banner.stories';

export default function IoInlineBannerConfiguratorPage() {
  return <Configurator tagName="io-inline-banner" story={inlineBannerStory} propDefinitions={inlineBannerPropDefinitions} />;
}
