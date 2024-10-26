import { defineConfig } from 'vitest/config';
import path from 'path';
export default defineConfig({
  test: {
    environment: 'node',
    watch:false,
    include: [
      path.resolve(__dirname, 'tests/*.node.test.ts'),
    ],
    testTimeout: 10000,
  },
  
});


