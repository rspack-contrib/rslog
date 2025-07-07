import { bold, gray } from './color.js';
import { gradient } from './gradient.js';
import { LOG_LEVEL, LOG_TYPES } from './constants.js';
import { isErrorStackMessage } from './utils.js';
import type { Options, LogMessage, Logger, LogMethods } from './types.js';

export let createLogger = (options: Options = {}) => {
  let maxLevel = options.level || 'info';

  let log = (type: LogMethods, message?: LogMessage, ...args: string[]) => {
    if (LOG_LEVEL[LOG_TYPES[type].level] > LOG_LEVEL[maxLevel]) {
      return;
    }

    if (message === undefined || message === null) {
      return console.log();
    }

    let logType = LOG_TYPES[type];
    let label = '';
    let text = '';

    if ('label' in logType) {
      label = (logType.label || '').padEnd(7);
      label = bold(logType.color ? logType.color(label) : label);
    }

    if (message instanceof Error) {
      if (message.stack) {
        let [name, ...rest] = message.stack.split('\n');
        if (name.startsWith('Error: ')) {
          name = name.slice(7);
        }
        text = `${name}\n${gray(rest.join('\n'))}`;
      } else {
        text = message.message;
      }
    }
    // change the color of error stacks to
    else if (logType.level === 'error' && typeof message === 'string') {
      let lines = message.split('\n');
      text = lines
        .map(line => (isErrorStackMessage(line) ? gray(line) : line))
        .join('\n');
    } else {
      text = `${message}`;
    }

    console.log(label.length ? `${label} ${text}` : text, ...args);
  };

  let logger = {
    greet: (message: string) => log('log', gradient(message)),
  } as Logger;

  (Object.keys(LOG_TYPES) as LogMethods[]).forEach(key => {
    logger[key] = (...args) => log(key, ...args);
  });

  Object.defineProperty(logger, 'level', {
    get: () => maxLevel,
    set(val) {
      maxLevel = val;
    },
  });

  logger.override = customLogger => {
    Object.assign(logger, customLogger);
  };

  return logger;
};
