<script setup lang="ts">
import { ref } from 'vue';

type Page = 'index' | 'modal' | 'form' | 'button';
const page = ref<Page>('index');

const modalOpen = ref(false);
const modalResult = ref('');
const modalName = ref('');
const buttonCount = ref(0);
const formResult = ref('');

function openModal() {
  modalOpen.value = true;
  modalResult.value = '';
}
function handleCancel() {
  modalOpen.value = false;
  modalResult.value = 'cancel-clicked';
}
function handleDismiss() {
  // Only treat dismiss as cancel when the modal is still open.
  // If handleSave() already closed it, dismiss fires as a side-effect
  // and must NOT overwrite the saved result.
  if (modalOpen.value) {
    handleCancel();
  }
}
function handleSave() {
  if (!modalName.value.trim()) {
    modalResult.value = 'validation-error: name is required';
    return;
  }
  modalOpen.value = false;
  modalResult.value = 'saved: ' + modalName.value;
}
function handleSubmit(e: Event) {
  e.preventDefault();
  const data = new FormData(e.target as HTMLFormElement);
  formResult.value = JSON.stringify(Object.fromEntries(data.entries()), null, 2);
}
</script>

<template>
  <nav aria-label="Playground navigation">
    <a @click="page = 'index'" :class="{ active: page === 'index' }">Index</a>
    <a @click="page = 'modal'" :class="{ active: page === 'modal' }">io-modal</a>
    <a @click="page = 'form'" :class="{ active: page === 'form' }">Forms</a>
    <a @click="page = 'button'" :class="{ active: page === 'button' }">io-button</a>
  </nav>

  <!-- Index -->
  <main v-if="page === 'index'">
    <h1>io Design System — Vue 3 Playground</h1>
    <p style="color: var(--io-text-secondary); font-size: 0.875rem">
      Vue 3 + Vite playground. Tests custom element event binding and slot rendering.
    </p>
  </main>

  <!-- Modal -->
  <main v-else-if="page === 'modal'">
    <h1>io-modal — Footer Button Click Test</h1>
    <io-button @click="openModal()">Open modal</io-button>
    <div class="result" data-testid="modal-result">{{ modalResult || 'No action yet' }}</div>
    <io-modal
      :open="modalOpen ? '' : null"
      heading="Create item"
      @dismiss="handleDismiss()"
    >
      <io-input label="Name" name="name" @input="(e: any) => modalName = e.target.value" />
      <io-button slot="footer" variant="ghost" @click="handleCancel()">Cancel</io-button>
      <io-button slot="footer" @click="handleSave()">Save</io-button>
    </io-modal>
  </main>

  <!-- Form -->
  <main v-else-if="page === 'form'">
    <h1>Forms — FACE Participation Test</h1>
    <form @submit="handleSubmit" style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <io-input label="Full name" name="name" required />
      <io-input label="Email" name="email" type="email" required />
      <io-checkbox label="I agree to terms" name="terms" required />
      <io-button type="submit">Submit</io-button>
    </form>
    <div v-if="formResult" class="result" data-testid="form-result">
      <pre>{{ formResult }}</pre>
    </div>
  </main>

  <!-- Button -->
  <main v-else-if="page === 'button'">
    <h1>io-button — Click Event Test</h1>
    <io-button @click="buttonCount++">Click me</io-button>
    <io-button variant="ghost" @click="buttonCount = 0" style="margin-left: 0.5rem">Reset</io-button>
    <div class="result" data-testid="button-result">Click count: {{ buttonCount }}</div>
  </main>
</template>

<style>
@import '@iodigital-com/components/global.css';
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: var(--io-font-primary, system-ui, sans-serif); padding: 2rem; background: var(--io-bg-page, #fff); color: var(--io-text-primary, #111); }
nav { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
nav a { color: var(--io-color-primary, #0000d2); text-decoration: none; font-size: 0.875rem; padding: 0.25rem 0.75rem; border: 1px solid var(--io-border, #ddd); border-radius: 6px; cursor: pointer; }
nav a:hover, nav a.active { background: var(--io-state-hover, #f0f0f0); }
h1 { font-size: 1.25rem; font-weight: 600; margin: 0 0 1.5rem; }
.result { margin-top: 1rem; padding: 0.75rem 1rem; border-radius: 6px; font-size: 0.875rem; border: 1px solid var(--io-border, #ddd); background: var(--io-bg-raised, #f9f9f9); min-height: 2.5rem; }
</style>
