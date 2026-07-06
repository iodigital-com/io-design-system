'use client';

import { inputStory, inputPropDefinitions } from '../io-input.stories';

import { FORM_PREVIEW_CLASSNAME } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoInputConfiguratorPage() {
  return (
    <Configurator
      tagName="io-input"
      story={inputStory}
      propDefinitions={inputPropDefinitions}
      previewClassName={FORM_PREVIEW_CLASSNAME}
    />
  );
}
