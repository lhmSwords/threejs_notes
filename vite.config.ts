import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/],
      imports: ['vue', 'vue-router', 'vue-i18n'],
      dts: './src/types/auto-imports.d.ts',
    }),
    Components({
      dirs: [],
      dts: './src/types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
