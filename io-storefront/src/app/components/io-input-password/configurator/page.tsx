'use client';

import { inputPasswordStory, inputPasswordPropDefinitions } from '../io-input-password.stories';

import { FORM_FIELD_PREVIEW_STYLE } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoInputPasswordConfiguratorPage() {
  return (
    <Configurator
      tagName="io-input-password"
      story={inputPasswordStory}
      propDefinitions={inputPasswordPropDefinitions}
      previewStyle={FORM_FIELD_PREVIEW_STYLE}
    />
  );
}
