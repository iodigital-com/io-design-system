'use client';

import { fileUploadStory, fileUploadPropDefinitions } from '../io-file-upload.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoFileUploadConfiguratorPage() {
  return (
    <Configurator
      tagName="io-file-upload"
      story={fileUploadStory}
      propDefinitions={fileUploadPropDefinitions}
    />
  );
}
