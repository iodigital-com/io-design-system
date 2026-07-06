'use client';

import { inputDateStory, inputDatePropDefinitions } from '../io-input-date.stories';

import { FORM_PREVIEW_CLASSNAME } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoInputDateConfiguratorPage() {
  return (
    <Configurator
      tagName="io-input-date"
      story={inputDateStory}
      propDefinitions={inputDatePropDefinitions}
      previewClassName={FORM_PREVIEW_CLASSNAME}
    />
  );
}
