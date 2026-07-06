'use client';

import { inputSearchStory, inputSearchPropDefinitions } from '../io-input-search.stories';

import { FORM_PREVIEW_CLASSNAME } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoInputSearchConfiguratorPage() {
  return (
    <Configurator
      tagName="io-input-search"
      story={inputSearchStory}
      propDefinitions={inputSearchPropDefinitions}
      previewClassName={FORM_PREVIEW_CLASSNAME}
    />
  );
}
