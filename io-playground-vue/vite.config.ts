import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat all tags with a dash as custom elements (Web Components)
          isCustomElement: (tag) => tag.startsWith('io-'),
        },
      },
    }),
  ],
});
