import { createApp } from 'vue';
import { defineCustomElements } from '@iodigital-com/components/loader';
import '@iodigital-com/components/global.css';
import App from './App.vue';

defineCustomElements(window);
createApp(App).mount('#app');
