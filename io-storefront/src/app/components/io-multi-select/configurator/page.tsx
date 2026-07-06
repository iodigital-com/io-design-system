'use client';

import { multiSelectStory, multiSelectPropDefinitions } from '../io-multi-select.stories';

import { FORM_PREVIEW_CLASSNAME } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoMultiSelectConfiguratorPage() {
  return (
    <Configurator
      tagName="io-multi-select"
      story={multiSelectStory}
      propDefinitions={multiSelectPropDefinitions}
      previewClassName={FORM_PREVIEW_CLASSNAME}
    />
  );
}
