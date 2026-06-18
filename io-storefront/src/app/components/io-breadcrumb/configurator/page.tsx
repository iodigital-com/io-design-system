'use client';

import { breadcrumbStory, breadcrumbPropDefinitions } from '../io-breadcrumb.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoBreadcrumbConfiguratorPage() {
  return (
    <Configurator
      tagName="io-breadcrumb"
      story={breadcrumbStory}
      propDefinitions={breadcrumbPropDefinitions}
    />
  );
}
