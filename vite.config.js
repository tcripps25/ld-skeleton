import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],  // Compatibility with a wide range of browsers
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],  // Polyfills for modern features
      renderLegacyChunks: false,  // Avoid generating unnecessary legacy chunks
    })
  ],
  base: "/ld-skeleton/",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        format: 'amd',  // Output in AMD format to support Moodle
        entryFileNames: 'vueapp_bundle.js',  // The name of the generated file
        amd: {
          id: 'local_vueapp',  // Define the AMD module name for Moodle's requirejs
        },
      },
    },
  },
});
