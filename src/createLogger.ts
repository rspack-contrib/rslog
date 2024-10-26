import { LOG_LEVEL, } from './constants';
import { isErrorStackMessage } from './utils';
import type { Options, LogMessage, Logger, LogMethods, LogTypes } from './types';

import type { gradient as TGradient } from './browser/gradient';
import type { finalLog as TFinalLog, getLabel as TGetLabel } from './browser/utils';


export let createLogger = (options: Options = {}, { getLabel, handleError, finalLog, greet, LOG_TYPES }: {
  LOG_TYPES: LogTypes;
  getLabel: typeof TGetLabel;
  finalLog: typeof TFinalLog;
  gradient: typeof TGradient,
  greet: (msg: string) => unknown,
  handleError: (msg: string) => string,

}) => {
  let maxLevel = options.level || 'log';
  const customLabels = options.labels || {};

  let log = (type: LogMethods, message?: LogMessage, ...args: string[]) => {
    if (LOG_LEVEL[LOG_TYPES[type].level] > LOG_LEVEL[maxLevel]) {
      return;
    }

    if (message === undefined || message === null) {
      return console.log();
    }

    let logType = LOG_TYPES[type];
    let text = '';

    const label = getLabel(type, logType, customLabels);

    if (message instanceof Error) {
      if (message.stack) {
        let [name, ...rest] = message.stack.split('\n');
        if (name.startsWith('Error: ')) {
          name = name.slice(7);
        }
        text = `${name}\n${handleError(rest.join('\n'))}`;
      } else {
        text = message.message;
      }
    }

    // change the color of error stacks to
    else if (logType.level === 'error' && typeof message === 'string') {

      let lines = message.split('\n');
      text = lines
        .map(line => (isErrorStackMessage(line) ? handleError(line) : line))
        .join('\n');
    } else {
      text = `${message}`;
    }

    finalLog(label, text, args, message)
  };

  let logger = {
    // greet
    greet: (message: string) => log('log', greet(message)),
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
