import { isErrorStackMessage } from '../src/utils';

import { expect, test, describe } from 'vitest';

describe('isErrorStackMessage', () => {
  test('should test error stack message correctly', () => {
    // Basic file path patterns
    expect(
      isErrorStackMessage('    at /rslog/packages/foo/bar.js:29:251'),
    ).toBeTruthy();
    expect(
      isErrorStackMessage(
        '    at Object.call (/rslog/packages/foo/bar.js:19:28)',
      ),
    ).toBeTruthy();
    expect(
      isErrorStackMessage(
        '    at async Command.<anonymous> (rslog/packages/foo/dist/cjs/index.js:55:5)',
      ),
    ).toBeTruthy();

    // Anonymous function patterns
    expect(
      isErrorStackMessage('    at transform.next (<anonymous>)'),
    ).toBeTruthy();
    expect(isErrorStackMessage('    at Array.map (<anonymous>)')).toBeTruthy();
    expect(
      isErrorStackMessage('        │     at new Promise (<anonymous>)'),
    ).toBeTruthy();

    // Node internal paths
    expect(
      isErrorStackMessage(
        '        │     at runSyncOrAsync (node:internal/util:427:12)',
      ),
    ).toBeTruthy();
    expect(
      isErrorStackMessage('    at Module._compile (node:internal/modules/cjs/loader:1105:14)'),
    ).toBeTruthy();

    // Windows-style paths
    expect(
      isErrorStackMessage('    at C:\\Users\\user\\project\\file.js:10:20'),
    ).toBeTruthy();
    expect(
      isErrorStackMessage('    at Object.<anonymous> (D:\\project\\index.js:5:10)'),
    ).toBeTruthy();

    // Additional edge cases
    expect(
      isErrorStackMessage('    at Generator.next (<anonymous>:1:2)'),
    ).toBeTruthy();
    expect(
      isErrorStackMessage('    at processTicksAndRejections (node:internal/process/task_queues:95:5)'),
    ).toBeTruthy();

    // Negative cases
    expect(
      isErrorStackMessage('    error   TypeError: foo.some is not a function'),
    ).toBeFalsy();
    expect(isErrorStackMessage('')).toBeFalsy();
    expect(isErrorStackMessage('    at')).toBeFalsy();
    expect(isErrorStackMessage('    at foo')).toBeFalsy();
    expect(isErrorStackMessage('Error: something went wrong')).toBeFalsy();
    expect(isErrorStackMessage('    - this is not an error stack')).toBeFalsy();
  });
});
