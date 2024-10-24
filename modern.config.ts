import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      format: 'cjs',
      target: 'es2021',
      buildType: 'bundle',
      input:['./src/browser/index.ts'],
      outDir: './dist/browser',
      esbuildOptions: options => {
        options.outExtension = { '.js': '.cjs' };
        return options;
      },
      dts: false,
    },

    {
      format: 'cjs',
      target: 'es2021',
      buildType: 'bundle',
      outDir: './dist/node',
      input:['./src/node/index.ts'],
      esbuildOptions: options => {
        options.outExtension = { '.js': '.cjs' };
        return options;
      },
      dts: false,
    },

    {
      buildType: 'bundle',
      outDir: './dist',
      input:['./src/node/index.ts'],
      dts: {
        only: true,
      },
    },
  ],
});
