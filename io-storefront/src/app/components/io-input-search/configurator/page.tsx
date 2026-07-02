'use client';

import { inputSearchStory, inputSearchPropDefinitions } from '../io-input-search.stories';

import { FORM_FIELD_PREVIEW_STYLE } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoInputSearchConfiguratorPage() {
  return (
    <Configurator
      tagName="io-input-search"
      story={inputSearchStory}
      propDefinitions={inputSearchPropDefinitions}
      previewStyle={FORM_FIELD_PREVIEW_STYLE}
    />
  );
}
