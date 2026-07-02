'use client';

import { selectStory, selectPropDefinitions } from '../io-select.stories';

import { FORM_FIELD_PREVIEW_STYLE } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoSelectConfiguratorPage() {
  return (
    <Configurator
      tagName="io-select"
      story={selectStory}
      propDefinitions={selectPropDefinitions}
      previewStyle={FORM_FIELD_PREVIEW_STYLE}
    />
  );
}
