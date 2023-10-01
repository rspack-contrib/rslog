import color from 'picocolors';
import type { LogType } from './types';

export const LOG_LEVEL: Record<string, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  log: 4,
};

export const LOG_TYPES = {
  error: {
    label: 'error',
    level: 'error',
    formatter: color.red,
  },
  info: {
    label: 'info',
    level: 'info',
    formatter: color.cyan,
  },
  ready: {
    label: 'ready',
    level: 'info',
    formatter: color.green,
  },
  success: {
    label: 'success',
    level: 'info',
    formatter: color.green,
  },
  warn: {
    label: 'warn',
    level: 'warn',
    formatter: color.yellow,
  },
  debug: {
    label: 'debug',
    level: 'debug',
    formatter: color.magenta,
  },
  log: {
    level: 'log',
  },
} satisfies Record<string, LogType>;
