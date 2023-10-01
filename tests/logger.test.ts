import { createLogger, logger } from '../src';
import { join } from 'path';

expect.addSnapshotSerializer({
  test: val => Array.isArray(val),
  print: val => {
    const root = join(__dirname, '..');
    return (val as any).toString().replaceAll(root, '<ROOT>');
  },
});

describe('logger', () => {
  test('should log as expected', () => {
    console.log = jest.fn();

    logger.log('this is a log message');
    logger.info('this is an info message');
    logger.warn('this is a warn message');
    logger.ready('this is a ready message');
    logger.debug('this is a debug message');
    logger.error(new Error('this is an error message'));
    logger.success('this is a success message');

    expect((console.log as jest.Mock).mock.calls).toMatchSnapshot();
  });

  test('should create new logger correctly', () => {
    console.log = jest.fn();

    const logger = createLogger({
      level: 'error',
    });

    logger.log('this is a log message');
    logger.info('this is an info message');
    logger.warn('this is a warn message');
    logger.ready('this is a ready message');
    logger.debug('this is a debug message');
    logger.error(new Error('this is an error message'));
    logger.success('this is a success message');

    expect((console.log as jest.Mock).mock.calls).toMatchSnapshot();
  });
});
