import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      format: 'cjs',
      target: 'es2021',
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
      target: 'es2021',
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
});
