'use client';

import { stepperStory, stepperPropDefinitions } from '../io-stepper.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoStepperConfiguratorPage() {
  return (
    <Configurator
      tagName="io-stepper"
      story={stepperStory}
      propDefinitions={stepperPropDefinitions}
    />
  );
}
