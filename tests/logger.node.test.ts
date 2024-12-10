import { createLogger, logger } from '../src/node';
import { join } from 'path';
import { expect, test, describe, vi, Mock, beforeEach } from 'vitest';

const root = join(__dirname, '../');

expect.addSnapshotSerializer({
  test: val => typeof val === 'string' && val.includes(root),
  print: val => {
    return (val as any).toString().replaceAll(root, '<ROOT>');
  },
});

describe('logger', () => {
  beforeEach(() => {
    console.log = vi.fn();
  });

  test('should log as expected', () => {
    logger.greet(`😊 Rslog v1.0.0\n`);
    logger.log('this is a log message');
    logger.info('this is an info message');
    logger.warn('this is a warn message');
    logger.ready('this is a ready message');
    logger.debug('this is a debug message');
    logger.success('this is a success message');

    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should create new logger with info level correctly', () => {
    const logger = createLogger({
      level: 'info',
    });

    logger.greet(`😊 Rslog v1.0.0\n`);
    logger.error('this is a error message');
    logger.info('this is an info message');
    logger.warn('this is a warn message');
    logger.ready('this is a ready message');
    logger.debug('this is a debug message');
    logger.success('this is a success message');

    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should create new logger with warn level correctly', () => {
    const logger = createLogger({
      level: 'warn',
    });

    logger.greet(`😊 Rslog v1.0.0\n`);
    logger.error('this is a error message');
    logger.info('this is an info message');
    logger.warn('this is a warn message');
    logger.ready('this is a ready message');
    logger.debug('this is a debug message');
    logger.success('this is a success message');

    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should log error with stack correctly', () => {
    console.log = vi.fn();
    const error = new Error('test error');
    logger.error(error);
    
    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toContain('error');
    expect(calls[0][0]).toContain('test error');
    expect(calls[0][0]).toContain('at ');
  });

  test('use custom labels if the value is passed', () => {
    const logger = createLogger({
      labels: {
        warn: '[ Prefix ] Warn',
        error: '[ Prefix ] Error',
        success: '[ Prefix ] Success',
        info: '[ Prefix ] Info',
        ready: '[ Prefix ] Ready',
        debug: '[ Prefix ] Debug',
      }
    });

    logger.info('this is an info message');
    logger.warn('this is a warn message');
    logger.ready('this is a ready message');
    logger.debug('this is a debug message');
    logger.success('this is a success message');

    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle multiple arguments in log messages', () => {
    logger.info('Message with', 'multiple', 'arguments');
    logger.warn('Warning with', { object: 'value' });
    logger.error('Error with', 123, true);

    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle empty and undefined messages', () => {
    logger.info();
    logger.warn('');
    logger.error(undefined);
    logger.debug(null);

    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle start method correctly', () => {
    logger.start('Starting process');
    logger.start('Starting with', 'multiple', 'arguments');

    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle multiple logger instances independently', () => {
    const logger1 = createLogger({ level: 'info' });
    const logger2 = createLogger({ level: 'warn' });

    logger1.info('Info from logger1');
    logger2.info('Info from logger2'); // Should not be logged
    logger2.warn('Warning from logger2');

    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle error objects with custom properties', () => {
    console.log = vi.fn();
    const customError = new Error('Custom error');
    (customError as any).customProp = 'test';
    logger.error(customError);
    
    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(1);
    const output = calls[0][0].replace(/\u001b\[\d+m/g, '');
    expect(output).toMatch(/error\s+Custom error/);
    expect(output).toContain('at ');
  });

  test('should handle non-string messages', () => {
    logger.info(123);
    logger.warn(true);
    logger.error({ message: 'object message' });
    logger.debug([1, 2, 3]);

    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });
});

describe('color and formatting', () => {
  beforeEach(() => {
    console.log = vi.fn();
  });

  test('should handle nested color formatting', () => {
    const logger = createLogger();
    logger.info('\x1b[31mred\x1b[39m and \x1b[32mgreen\x1b[39m text');
    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle multiple nested styles', () => {
    const logger = createLogger();
    logger.info('\x1b[1m\x1b[31mbold red\x1b[39m\x1b[22m text');
    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle gradient text with spaces and newlines', () => {
    const logger = createLogger();
    logger.greet('Hello\nWorld with spaces');
    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle emoji in gradient text', () => {
    const logger = createLogger();
    logger.greet('Hello 👋 World 🌍');
    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });
});

describe('label formatting', () => {
  beforeEach(() => {
    console.log = vi.fn();
  });

  test('should handle empty labels', () => {
    const logger = createLogger({
      labels: {
        info: '',
        warn: '',
        error: '',
      }
    });
    
    logger.info('message');
    logger.warn('message');
    logger.error('message');
    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle very long labels', () => {
    const logger = createLogger({
      labels: {
        info: 'VeryLongLabelThatExceedsNormalLength',
        warn: 'AnotherVeryLongLabel',
      }
    });
    
    logger.info('message');
    logger.warn('message');
    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });
});

describe('error handling', () => {
  beforeEach(() => {
    console.log = vi.fn();
  });

  test('should handle circular references in error objects', () => {
    const circularObj: any = { foo: 'bar' };
    circularObj.self = circularObj;
    
    const error = new Error('Circular reference error');
    (error as any).circular = circularObj;
    
    logger.error(error);
    expect((console.log as Mock).mock.calls[0][0]).toContain('Circular reference error');
  });

  test('should handle errors with no stack trace', () => {
    const errorLike = {
      message: 'Error-like object',
      name: 'CustomError'
    };
    
    logger.error(errorLike);
    expect((console.log as Mock).mock.calls).toMatchSnapshot();
  });

  test('should handle errors with custom toString', () => {
    console.log = vi.fn();
    class CustomError extends Error {
      toString() {
        return 'Custom toString message';
      }
    }
    
    const error = new CustomError('message');
    logger.error(error);
    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(1);
    const output = calls[0][0].replace(/\u001b\[\d+m/g, '');
    expect(output).toMatch(/error\s+message/);
    expect(output).toContain('at ');
  });
});

describe('log level filtering', () => {
  beforeEach(() => {
    console.log = vi.fn();
  });

  test('should respect error level', () => {
    const logger = createLogger({ level: 'error' });
    
    logger.debug('debug');
    logger.info('info');
    logger.warn('warn');
    logger.error('error');
    
    const calls = (console.log as Mock).mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toContain('error');
  });

  test('should handle invalid log level gracefully', () => {
    const logger = createLogger({ 
      // @ts-expect-error testing invalid level
      level: 'invalid' 
    });
    
    logger.info('should still work');
    expect((console.log as Mock).mock.calls.length).toBe(1);
  });
});
