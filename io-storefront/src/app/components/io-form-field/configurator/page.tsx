'use client';

import { formFieldStory, formFieldPropDefinitions } from '../io-form-field.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoFormFieldConfiguratorPage() {
  return (
    <Configurator
      tagName="io-form-field"
      story={formFieldStory}
      propDefinitions={formFieldPropDefinitions}
    />
  );
}
