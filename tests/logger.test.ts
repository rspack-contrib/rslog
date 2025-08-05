import { createLogger, Logger, logger } from '../src/index.js';
import { join } from 'path';
import { expect, test, describe, rs, Mock } from '@rstest/core';
import stripAnsi from 'strip-ansi';

const root = join(__dirname, '..');

expect.addSnapshotSerializer({
  test: val => typeof val === 'string' && val.includes(root),
  print: val => {
    return stripAnsi((val as any).toString().replaceAll(root, '<ROOT>'));
  },
});

const printTestLogs = (logger: Logger) => {
  logger.greet(`😊 Rslog v1.0.0\n`);
  logger.log('this is a log message');
  logger.error('this is a error message');
  logger.info('this is an info message');
  logger.warn('this is a warn message');
  logger.ready('this is a ready message');
  logger.debug('this is a debug message');
  logger.success('this is a success message');
};

describe('logger', () => {
  test('should log as expected', () => {
    console.log = rstest.fn();

    printTestLogs(logger);

    expect(
      (console.log as Mock).mock.calls.map(items =>
        items.map(item => stripAnsi(item.toString())),
      ),
    ).toMatchSnapshot();
  });

  test('should create new logger with info level correctly', () => {
    console.log = rs.fn();

    const logger = createLogger({
      level: 'info',
    });

    printTestLogs(logger);

    expect(
      (console.log as Mock).mock.calls.map(items =>
        items.map(item => stripAnsi(item.toString())),
      ),
    ).toMatchSnapshot();
  });

  test('should create new logger with warn level correctly', () => {
    console.log = rs.fn();

    const logger = createLogger({
      level: 'warn',
    });

    printTestLogs(logger);

    expect(
      (console.log as Mock).mock.calls.map(items =>
        items.map(item => stripAnsi(item.toString())),
      ),
    ).toMatchSnapshot();
  });

  test('should log error with stack correctly', () => {
    console.log = rs.fn();

    logger.error(new Error('this is an error message'));

    expect((console.log as Mock).mock.calls[0][0]).toMatchSnapshot();
  });

  test('should create new logger with silent level correctly', () => {
    console.log = rs.fn();

    const logger = createLogger({
      level: 'silent',
    });

    printTestLogs(logger);

    expect((console.log as Mock).mock.calls.length).toBe(0);
  });
});
