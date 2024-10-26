import { createLogger, logger } from '../src/node';
import { join } from 'path';
import { expect, test, describe, vi, Mock } from 'vitest';

const root = join(__dirname, '../');

expect.addSnapshotSerializer({
  test: val => typeof val === 'string' && val.includes(root),
  print: val => {
    return (val as any).toString().replaceAll(root, '<ROOT>');
  },
});

describe('logger', () => {
  test('should log as expected', () => {
    console.log = vi.fn();

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
    console.log = vi.fn();

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
    console.log = vi.fn();

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

    logger.error(new Error('this is an error message'));

    expect((console.log as Mock).mock.calls[0][0]).toMatchSnapshot();
  });

  test('use custom labels if the value is passed', () => {
    console.log = vi.fn();
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
});
