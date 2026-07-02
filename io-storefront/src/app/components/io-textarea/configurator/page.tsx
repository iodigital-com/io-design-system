'use client';

import { textareaStory, textareaPropDefinitions } from '../io-textarea.stories';

import { FORM_FIELD_PREVIEW_STYLE } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoTextareaConfiguratorPage() {
  return (
    <Configurator
      tagName="io-textarea"
      story={textareaStory}
      propDefinitions={textareaPropDefinitions}
      previewStyle={FORM_FIELD_PREVIEW_STYLE}
    />
  );
}
