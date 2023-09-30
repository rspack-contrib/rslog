import color from 'picocolors';
import { LOG_LEVEL, LOG_TYPES } from './constants';
import { getLongestLabelLength, isErrorStackMessage } from './utils';
import type { Options, LogMessage, LogType, LogFunction } from './types';

export const createLogger = <T extends Record<string, LogType>>(
  options: Options<T> = {},
) => {
  const level = options.level || LOG_LEVEL.log;
  const types = { ...LOG_TYPES, ...options.types };
  const labelLength = getLongestLabelLength(
    Object.values(types).map(item => (item as LogType).label),
  );

  type Type = keyof typeof types;

  const log = (type: Type, message?: LogMessage, ...args: string[]) => {
    if (LOG_LEVEL[type] > LOG_LEVEL[level]) {
      return;
    }

    if (message === undefined || message === null) {
      console.log();
      return;
    }

    let label = '';
    let text = '';
    const logType = types[type];

    if ('label' in logType) {
      label = label.padEnd(labelLength);
      label = color.bold(
        logType.LogFormatter ? logType.LogFormatter(label) : label,
      );
    }

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

    const log = label.length > 0 ? `${label} ${text}` : text;

    console.log(log, ...args);
  };

  const logger = {} as Record<Type, LogFunction>;

  (Object.keys(types) as Type[]).forEach((key: Type) => {
    logger[key] = (message, ...args) => log(key, message, ...args);
  });

  return logger;
};
