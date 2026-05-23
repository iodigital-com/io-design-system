'use client';

import { avatarStory, avatarPropDefinitions } from '../io-avatar.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoAvatarConfiguratorPage() {
  return (
    <Configurator
      tagName="io-avatar"
      story={avatarStory}
      propDefinitions={avatarPropDefinitions}
    />
  );
}
