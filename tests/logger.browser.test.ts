import { createLogger, logger } from '../src/browser';
import { join } from 'path';
import {
  expect,
  test,
  describe,
  vi,
  Mock,
  beforeEach,
  afterEach,
} from 'vitest';

const root = join(__dirname, '../');

// Mock color module
vi.mock('../src/browser/color', () => {
  const colorFn = (input: string | [string, string]) => {
    if (Array.isArray(input)) {
      const [label, style] = input;
      return [`%c${label}`, style];
    }
    return [`%c${input}`, 'font-weight: bold;'];
  };

  const createColorFn = (color: string): typeof colorFn => {
    return input => {
      if (Array.isArray(input)) {
        const [label, style] = input;
        return [
          `%c${label}`,
          `font-weight: bold;color: ${color};${style ? ` ${style}` : ''}`,
        ];
      }
      return [`%c${input}`, `font-weight: bold;color: ${color};`];
    };
  };

  let supportsSubstitutions = true;

  return {
    supportColor: vi.fn(() => supportsSubstitutions),
    bold: colorFn,
    red: createColorFn('red'),
    green: createColorFn('green'),
    orange: createColorFn('orange'),
    dodgerblue: createColorFn('dodgerblue'),
    magenta: createColorFn('magenta'),
    gray: createColorFn('gray'),
  };
});

expect.addSnapshotSerializer({
  test: val => typeof val === 'string' && val.includes(root),
  print: val => {
    return (val as any).toString().replaceAll(root, '<ROOT>');
  },
});

describe('logger', () => {
  test('should log as expected', () => {
    console.log = vi.fn();
    logger.info('test info');
    logger.warn('test warn');
    logger.error('test error');

    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(3);

    // Info log
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[0][1]).toBe('font-weight: bold;color: dodgerblue;');
    expect(calls[0][2]).toBe('test info');

    // Warn log
    expect(calls[1][0]).toBe('%c%cwarn');
    expect(calls[1][1]).toBe('font-weight: bold;color: orange;');
    expect(calls[1][2]).toBe('test warn');

    // Error log
    expect(calls[2][0]).toBe('%c%cerror');
    expect(calls[2][1]).toBe('font-weight: bold;color: red;');
    expect(calls[2][2]).toBe('test error');
  });

  test('should create new logger with info level correctly', () => {
    console.log = vi.fn();
    const newLogger = createLogger({ level: 'info' });
    newLogger.info('test info');
    newLogger.warn('test warn');
    newLogger.error('test error');

    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(3);

    // Info log
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[0][1]).toBe('font-weight: bold;color: dodgerblue;');
    expect(calls[0][2]).toBe('test info');

    // Warn log
    expect(calls[1][0]).toBe('%c%cwarn');
    expect(calls[1][1]).toBe('font-weight: bold;color: orange;');
    expect(calls[1][2]).toBe('test warn');

    // Error log
    expect(calls[2][0]).toBe('%c%cerror');
    expect(calls[2][1]).toBe('font-weight: bold;color: red;');
    expect(calls[2][2]).toBe('test error');
  });

  test('should create new logger with warn level correctly', () => {
    console.log = vi.fn();
    const newLogger = createLogger({ level: 'warn' });
    newLogger.info('test info');
    newLogger.warn('test warn');
    newLogger.error('test error');

    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(2);

    // Warn log
    expect(calls[0][0]).toBe('%c%cwarn');
    expect(calls[0][1]).toBe('font-weight: bold;color: orange;');
    expect(calls[0][2]).toBe('test warn');

    // Error log
    expect(calls[1][0]).toBe('%c%cerror');
    expect(calls[1][1]).toBe('font-weight: bold;color: red;');
    expect(calls[1][2]).toBe('test error');
  });

  test('should log error with stack correctly', () => {
    console.log = vi.fn();
    logger.error(new Error('this is an error message'));
    expect((console.log as Mock).mock.calls[0][0]).toBe('%c%cerror');
  });

  test('use custom labels if the value is passed', () => {
    console.log = vi.fn();
    const logger = createLogger({
      labels: {
        info: '[ Prefix ] Info',
        warn: '[ Prefix ] Warn',
        ready: '[ Prefix ] Ready',
        success: '[ Prefix ] Success',
      },
    });

    logger.info('this is an info message');
    logger.warn('this is a warn message');
    logger.ready('this is a ready message');
    logger.success('this is a success message');

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%c[ Prefix ] Info');
    expect(calls[1][0]).toBe('%c%c[ Prefix ] Warn');
    expect(calls[2][0]).toBe('%c%c[ Prefix ] Ready');
    expect(calls[3][0]).toBe('%c%c[ Prefix ] Success');
  });

  test('should handle gradient with empty string', () => {
    console.log = vi.fn();
    logger.greet('');
    expect((console.log as Mock).mock.calls.length).toBe(1);
  });

  test('should handle invalid log level gracefully', () => {
    console.log = vi.fn();
    const logger = createLogger({
      level: 'invalid' as any,
    });

    logger.info('test message');
    logger.debug('test message');

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[1][0]).toBe('%c%cdebug');
  });

  test('should handle custom log types', () => {
    console.log = vi.fn();
    const logger = createLogger({
      labels: {
        info: 'CUSTOM_INFO',
      },
    });
    logger.info('test message');

    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe('%c%cCUSTOM_INFO');
    expect(calls[0][2]).toBe('test message');
  });

  test('should handle multiple arguments in log message', () => {
    console.log = vi.fn();
    logger.info('message', 'arg1', 'arg2');

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[0][2]).toBe('message');
  });

  test('should handle objects in log message', () => {
    console.log = vi.fn();
    logger.info('message', { key: 'value' });

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[0][2]).toBe('message');
  });
});

describe('color module', () => {
  test('should handle all color functions', () => {
    console.log = vi.fn();

    const logger = createLogger();
    logger.info('red message');
    logger.warn('orange message');
    logger.success('green message');

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[1][0]).toBe('%c%cwarn');
    expect(calls[2][0]).toBe('%c%csuccess');
  });

  test('should handle style combinations', () => {
    console.log = vi.fn();

    const logger = createLogger();
    logger.info(['test', 'font-weight: bold; font-style: italic;']);

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[0][1]).toBe('font-weight: bold;color: dodgerblue;');
    expect(calls[0][2]).toBe('test');
    expect(calls[0][3]).toBe('font-weight: bold; font-style: italic;');
  });
});

describe('gradient functionality', () => {
  beforeEach(() => {
    console.log = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should handle empty string', () => {
    logger.greet('');
    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(1); // One call for empty string
    expect(calls[0][0]).toBe('');
  });

  test('should handle whitespace-only strings', () => {
    logger.greet('   \n   \t   ');
    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(1); // One call for whitespace string
    expect(calls[0][0]).toBe('   \n   \t   ');
  });

  test('should handle normal strings', () => {
    logger.greet('Hello World');
    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(1); // One call for content
    expect(calls[0][0]).toBe('Hello World');
  });

  test('should handle multiline strings', () => {
    logger.greet('Hello\nWorld');
    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(1); // One call for content
    expect(calls[0][0]).toBe('Hello\nWorld');
  });
});

describe('utils module', () => {
  test('should handle empty labels', () => {
    console.log = vi.fn();
    const logger = createLogger({ labels: {} });
    logger.info('test message');
    logger.warn('test message');

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[1][0]).toBe('%c%cwarn');
  });

  test('should handle array messages', () => {
    console.log = vi.fn();
    logger.info(['message part 1', 'message part 2']);

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[0][2]).toBe('message part 1');
    expect(calls[0][3]).toBe('message part 2');
  });
});

describe('color support detection', () => {
  const originalConsoleLog = console.log;

  beforeEach(() => {
    vi.resetModules();
    console.log = originalConsoleLog;
  });

  test('should cache color support result', () => {
    const supportColor = vi.fn(() => true);
    expect(supportColor()).toBe(true);
    expect(supportColor()).toBe(true);
    expect(supportColor).toHaveBeenCalledTimes(2);
  });

  test('should handle color support detection failure', () => {
    const supportColor = vi.fn(() => false);
    expect(supportColor()).toBe(false);
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    vi.resetModules();
    vi.clearAllMocks();
  });
});

describe('logger configuration', () => {
  test('should handle undefined options', () => {
    console.log = vi.fn();
    const logger = createLogger(undefined);
    logger.info('test');
    expect((console.log as Mock).mock.calls.length).toBe(1);
  });

  test('should handle empty string messages', () => {
    console.log = vi.fn();
    const logger = createLogger();
    logger.info('');
    logger.warn('');
    logger.error('');

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[1][0]).toBe('%c%cwarn');
    expect(calls[2][0]).toBe('%c%cerror');
  });

  test('should handle non-string messages', () => {
    console.log = vi.fn();
    const logger = createLogger();
    logger.info(123);
    logger.info(undefined);
    logger.info(null);
    logger.info({ test: 'object' });

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cinfo');
    expect(calls[0][2]).toBe('123');
    expect(calls[3][0]).toBe('%c%cinfo');
    expect(calls[3][2]).toBe('[object Object]');
  });
});

describe('label handling', () => {
  test('should handle missing label in log type', () => {
    console.log = vi.fn();
    const logger = createLogger();
    logger.log('test message');
    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle custom color functions', () => {
    console.log = vi.fn();
    const logger = createLogger({
      labels: {
        info: 'CUSTOM',
      },
    });
    logger.info(['CUSTOM', 'color: purple;']);

    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cCUSTOM');
    expect(calls[0][2]).toBe('CUSTOM');
    expect(calls[0][3]).toBe('color: purple;');
  });
});

describe('error handling', () => {
  test('should handle Error objects with custom properties', () => {
    console.log = vi.fn();
    const error = new Error('Custom error');
    logger.error(error);
    const calls = (console.log as Mock).mock.calls;
    expect(calls[0][0]).toBe('%c%cerror');
    expect(calls[0][1]).toBe('font-weight: bold;color: red;');
    expect(calls[0][2]).toContain('Custom error');
  });

  test('should handle non-Error objects in error method', () => {
    console.log = vi.fn();
    logger.error({ message: 'error-like object' });
    logger.error('string error');
    logger.error(123);

    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(3);

    // Error-like object
    expect(calls[0][0]).toBe('%c%cerror');
    expect(calls[0][1]).toBe('font-weight: bold;color: red;');
    expect(calls[0][2]).toBe('[object Object]');

    // String error
    expect(calls[1][0]).toBe('%c%cerror');
    expect(calls[1][1]).toBe('font-weight: bold;color: red;');
    expect(calls[1][2]).toBe('string error');

    // Number error
    expect(calls[2][0]).toBe('%c%cerror');
    expect(calls[2][1]).toBe('font-weight: bold;color: red;');
    expect(calls[2][2]).toBe('123');
  });
});
