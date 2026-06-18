'use client';

import { sheetStory, sheetPropDefinitions } from '../io-sheet.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoSheetConfiguratorPage() {
  return (
    <Configurator
      tagName="io-sheet"
      story={sheetStory}
      propDefinitions={sheetPropDefinitions}
    />
  );
}
