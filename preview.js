const { logger } = require('.');

logger.info('This is a info message');
logger.warn('This is a warn message');
logger.debug('This is a debug message');
logger.ready('This is a ready message');
logger.success('This is a success message');
logger.error('This is a error message');
logger.error(new Error('This is a error message with stack'));
