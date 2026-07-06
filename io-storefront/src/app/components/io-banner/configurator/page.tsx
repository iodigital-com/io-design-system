'use client';

import { Configurator } from '@/components/playground/Configurator';

import { bannerPropDefinitions, bannerStory } from '../io-banner.stories';

export default function IoBannerConfiguratorPage() {
  return (
    <Configurator
      tagName="io-banner"
      story={bannerStory}
      propDefinitions={bannerPropDefinitions}
      previewClassName="[&_io-button]:self-center"
    />
  );
}
