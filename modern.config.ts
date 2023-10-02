import { moduleTools, defineConfig } from '@modern-js/module-tools';
import { testingPlugin } from '@modern-js/plugin-testing';
import path from 'path';

export default defineConfig({
  plugins: [moduleTools(), testingPlugin()],
  buildPreset: 'npm-library',
  buildConfig: {
    target: 'es2019',
    minify: 'esbuild',
    esbuildOptions: options => {
      if (options.format === 'esm') {
        options.outExtension = { '.js': '.mjs' };
      }
      return options;
    },
  },
  testing: {
    jest(config) {
      config.setupFiles = [path.join(__dirname, 'tests/jest.setup.js')];
      return config;
    },
  },
});
