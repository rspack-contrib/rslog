import { moduleTools, defineConfig } from '@modern-js/module-tools';
import { testingPlugin } from '@modern-js/plugin-testing';
import path from 'path';

export default defineConfig({
  plugins: [moduleTools(), testingPlugin()],
  buildConfig: [
    {
      format: 'cjs',
      target: 'es2019',
      minify: 'esbuild',
      buildType: 'bundle',
      outDir: './dist',
      esbuildOptions: options => {
        options.outExtension = { '.js': '.cjs' };
        return options;
      },
      dts: false,
    },
    {
      format: 'esm',
      target: 'es2019',
      minify: 'esbuild',
      buildType: 'bundle',
      outDir: './dist',
      esbuildOptions: options => {
        options.outExtension = { '.js': '.mjs' };
        return options;
      },
      dts: false,
    },
    {
      buildType: 'bundle',
      outDir: './dist',
      dts: {
        only: true,
      },
    },
  ],
  testing: {
    jest(config) {
      config.setupFiles = [path.join(__dirname, 'tests/jest.setup.js')];
      return config;
    },
  },
});
