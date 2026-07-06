'use client';

import { textareaStory, textareaPropDefinitions } from '../io-textarea.stories';

import { FORM_PREVIEW_CLASSNAME } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoTextareaConfiguratorPage() {
  return (
    <Configurator
      tagName="io-textarea"
      story={textareaStory}
      propDefinitions={textareaPropDefinitions}
      previewClassName={FORM_PREVIEW_CLASSNAME}
    />
  );
}
