'use client';

import { multiSelectStory, multiSelectPropDefinitions } from '../io-multi-select.stories';

import { FORM_FIELD_PREVIEW_STYLE } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoMultiSelectConfiguratorPage() {
  return (
    <Configurator
      tagName="io-multi-select"
      story={multiSelectStory}
      propDefinitions={multiSelectPropDefinitions}
      previewStyle={FORM_FIELD_PREVIEW_STYLE}
    />
  );
}
