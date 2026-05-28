'use client';

import { Configurator } from '@/components/playground/Configurator';

import { inlineNotificationPropDefinitions, inlineNotificationStory } from '../io-inline-notification.stories';

export default function IoInlineNotificationConfiguratorPage() {
  return <Configurator tagName="io-inline-notification" story={inlineNotificationStory} propDefinitions={inlineNotificationPropDefinitions} />;
}
