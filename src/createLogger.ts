import { color } from './color';
import { gradient } from './gradient';
import { LOG_LEVEL, LOG_TYPES } from './constants';
import { isErrorStackMessage } from './utils';
import type { Options, LogMessage, LogFunction } from './types';

type Keys = keyof typeof LOG_TYPES;

export let createLogger = (options: Options = {}) => {
  let maxLevel = options.level || 'log';

  let log = (type: Keys, message?: LogMessage, ...args: string[]) => {
    if (LOG_LEVEL[LOG_TYPES[type].level] > LOG_LEVEL[maxLevel]) {
      return;
    }

    if (message === undefined || message === null) {
      console.log();
      return;
    }

    let logType = LOG_TYPES[type];

    let label = '';

    if ('label' in logType) {
      label = (logType.label || '').padEnd(7);
      label = color.bold(logType.formatter ? logType.formatter(label) : label);
    }

    let text = '';

    if (message instanceof Error) {
      if (message.stack) {
        let [name, ...rest] = message.stack.split('\n');
        text = `${name.replace('Error: ', '')}\n${color.gray(rest.join('\n'))}`;
      } else {
        text = message.message;
      }
    }
    // change the color of error stacks to gray
    else if (logType.level === 'error' && typeof message === 'string') {
      let lines = message.split('\n');
      text = lines
        .map(line => (isErrorStackMessage(line) ? color.gray(line) : line))
        .join('\n');
    } else {
      text = `${message}`;
    }

    let log = label.length ? `${label} ${text}` : text;

    console.log(log, ...args);
  };

  type Logger = Record<Keys, LogFunction> & {
    greet: (message: string) => void;
  };

  let logger = {
    greet: (message: string) => log('log', gradient(message)),
  } as Logger;

  (Object.keys(LOG_TYPES) as Keys[]).forEach(key => {
    logger[key] = (...args) => log(key, ...args);
  });

  return logger;
};
