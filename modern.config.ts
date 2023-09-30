import { moduleTools, defineConfig } from '@modern-js/module-tools';
import { testingPlugin } from '@modern-js/plugin-testing';

export default defineConfig({
  plugins: [moduleTools(), testingPlugin()],
  buildPreset: 'npm-library',
  buildConfig: {
    target: 'es2019',
    minify: 'terser',
  },
});
