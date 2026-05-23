'use client';

import { skeletonStory, skeletonPropDefinitions } from '../io-skeleton.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoSkeletonConfiguratorPage() {
  return (
    <Configurator
      tagName="io-skeleton"
      story={skeletonStory}
      propDefinitions={skeletonPropDefinitions}
    />
  );
}
