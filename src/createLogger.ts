import color from 'picocolors';
import { LOG_LEVEL, LOG_TYPES } from './constants';
import { isErrorStackMessage } from './utils';
import type { Options, LogMessage, LogFunction } from './types';

type Keys = keyof typeof LOG_TYPES;

export const createLogger = (options: Options = {}) => {
  const maxLevel = options.level || LOG_LEVEL.log;

  const log = (type: Keys, message?: LogMessage, ...args: string[]) => {
    if (LOG_LEVEL[LOG_TYPES[type].level] > LOG_LEVEL[maxLevel]) {
      return;
    }

    if (message === undefined || message === null) {
      console.log();
      return;
    }

    const logType = LOG_TYPES[type];

    let label = '';

    if ('label' in logType) {
      label = (logType.label || '').padEnd(7);
      label = color.bold(logType.formatter ? logType.formatter(label) : label);
    }

    let text = '';

    if (message instanceof Error) {
      if (message.stack) {
        const [name, ...rest] = message.stack.split('\n');
        text = `${name}\n${color.gray(rest.join('\n'))}`;
      } else {
        text = message.message;
      }
    }
    // change the color of error stacks to gray
    else if (logType.level === 'error' && typeof message === 'string') {
      const lines = message.split('\n');
      text = lines
        .map(line => (isErrorStackMessage(line) ? color.gray(line) : line))
        .join('\n');
    } else {
      text = `${message}`;
    }

    const log = label.length ? `${label} ${text}` : text;

    console.log(log, ...args);
  };

  const logger = {} as Record<Keys, LogFunction>;

  (Object.keys(LOG_TYPES) as Keys[]).forEach(key => {
    logger[key] = (message, ...args) => log(key, message, ...args);
  });

  return logger;
};
