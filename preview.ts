import { logger } from './dist/node/index.cjs';

logger.greet(`\n➜ isomorphic-rslog v0.0.1\n`);
logger.info('This is a info message');
logger.start('This is a start message');
logger.warn('This is a warn message');
logger.debug('This is a debug message');
logger.ready('This is a ready message');
logger.success('This is a success message');
logger.error('This is a error message');
logger.error(new Error('This is a error message with stack'));
logger.error(new TypeError('This is a type error with stack'));
