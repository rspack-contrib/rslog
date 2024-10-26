import { defineConfig } from 'vitest/config';
import path from 'path';
export default defineConfig({
  test: {
    environment: 'jsdom',
    watch:false,
    include: [
      path.resolve(__dirname, 'tests/*.browser.test.ts'),
    ],
    testTimeout: 10000,
  },
  
});


