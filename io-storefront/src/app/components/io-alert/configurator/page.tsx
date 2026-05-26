'use client';

import { alertStory, alertPropDefinitions } from '../io-alert.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoAlertConfiguratorPage() {
  return (
    <Configurator
      tagName="io-alert"
      story={alertStory}
      propDefinitions={alertPropDefinitions}
    />
  );
}
