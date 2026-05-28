'use client';

import { Configurator } from '@/components/configurator/Configurator';

import { bannerPropDefinitions, bannerStory } from '../io-banner.stories';

export default function IoBannerConfiguratorPage() {
  return <Configurator story={bannerStory} propDefinitions={bannerPropDefinitions} />;
}
