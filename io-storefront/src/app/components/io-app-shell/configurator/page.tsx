'use client';

import { appShellStory, appShellPropDefinitions } from '../io-app-shell.stories';
import { Configurator } from '@/components/playground/Configurator';

export default function IoAppShellConfiguratorPage() {
  return (
    <Configurator
      tagName="io-app-shell"
      story={appShellStory}
      propDefinitions={appShellPropDefinitions}
    />
  );
}
