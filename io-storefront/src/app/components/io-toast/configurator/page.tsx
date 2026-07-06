'use client';

import { useCallback, useRef, useState } from 'react';

import { toastPropDefinitions } from '../io-toast.stories';

import type { StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

import { ConfiguratorControls } from '@/components/playground/ConfiguratorControls';
import { Playground } from '@/components/playground/Playground';

export default function IoToastConfiguratorPage() {
  const toastRef = useRef<HTMLIoToastElement | null>(null);
  const [storyState, setStoryState] = useState<StoryState<HTMLTagOrComponent>>({
    properties: { text: 'Notification message.', variant: 'neutral', duration: 6000, persistent: false },
  });

  const text = (storyState.properties?.text as string) ?? 'Notification message.';
  const variant = (storyState.properties?.variant as string) ?? 'neutral';
  const duration = (storyState.properties?.duration as number) ?? 6000;
  const persistent = (storyState.properties?.persistent as boolean) ?? false;

  const frameworkCode = {
    html: `<io-toast id="toast"></io-toast>

<script>
  const toast = document.getElementById('toast');
  toast.addToast({ text: '${text}', variant: '${variant}', duration: ${duration}, persistent: ${persistent} });
</script>`,
    react: `import { useRef } from 'react';

function App() {
  const toastRef = useRef(null);

  return (
    <>
      <io-toast ref={toastRef} />
      <io-button
        onClick={() => toastRef.current?.addToast({ text: '${text}', variant: '${variant}', duration: ${duration}, persistent: ${persistent} })}
      >
        Show toast
      </io-button>
    </>
  );
}`,
    angular: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IoToast, IoButton, ToastManager } from '@iodigital-com/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IoToast, IoButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <io-toast></io-toast>
    <io-button (click)="showToast()">Show toast</io-button>
  \`,
})
export class AppComponent {
  constructor(private toast: ToastManager) {}

  showToast() {
    this.toast.addToast({ text: '${text}', variant: '${variant}', duration: ${duration}, persistent: ${persistent} });
  }
}`,
    vue: `<template>
  <io-toast ref="toast" />
  <io-button @click="showToast">Show toast</io-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const toast = ref<HTMLIoToastElement | null>(null);
const showToast = () => toast.value?.addToast({ text: '${text}', variant: '${variant}', duration: ${duration}, persistent: ${persistent} });
</script>`,
  };

  const showToast = useCallback(() => {
    if (toastRef.current) {
      toastRef.current.addToast({
        text,
        variant: variant as Parameters<HTMLIoToastElement['addToast']>[0]['variant'],
        duration,
        persistent,
      });
    }
  }, [text, variant, duration, persistent]);

  return (
    <div>
      <Playground frameworkCode={frameworkCode}>
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Toast container — fixed-position, rendered here so the ref is wired */}
          <io-toast ref={toastRef} suppressHydrationWarning />
          <io-button className="!self-center" variant="solid" onClick={showToast}>
            Show toast
          </io-button>
        </div>
      </Playground>
      <ConfiguratorControls
        propDefinitions={toastPropDefinitions}
        storyState={storyState}
        setStoryState={setStoryState}
      />
    </div>
  );
}
