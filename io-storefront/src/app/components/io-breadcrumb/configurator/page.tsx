'use client';

import { breadcrumbStoryDefault, breadcrumbPropDefinitions } from '../io-breadcrumb.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoBreadcrumbConfiguratorPage() {
  return (
    <Configurator
      tagName="io-breadcrumb"
      story={breadcrumbStoryDefault}
      propDefinitions={breadcrumbPropDefinitions}
    />
  );
}
