import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildPreset: 'npm-library',
  buildConfig: {
    target: 'es2019',
    minify: 'terser',
  },
});
