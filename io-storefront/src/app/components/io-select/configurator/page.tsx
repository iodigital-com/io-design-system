'use client';

import { selectStory, selectPropDefinitions } from '../io-select.stories';

import { FORM_PREVIEW_CLASSNAME } from '@/components/playground/preview-styles';
import { Configurator } from '@/components/playground/Configurator';

export default function IoSelectConfiguratorPage() {
  return (
    <Configurator
      tagName="io-select"
      story={selectStory}
      propDefinitions={selectPropDefinitions}
      previewClassName={FORM_PREVIEW_CLASSNAME}
    />
  );
}
