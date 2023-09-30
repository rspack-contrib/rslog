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
    LogFormatter: color.red,
  },
  info: {
    label: 'info',
    level: 'info',
    LogFormatter: color.cyan,
  },
  ready: {
    label: 'ready',
    level: 'info',
    LogFormatter: color.green,
  },
  success: {
    label: 'success',
    level: 'info',
    LogFormatter: color.green,
  },
  warn: {
    label: 'warn',
    level: 'warn',
    LogFormatter: color.yellow,
  },
  debug: {
    label: 'debug',
    level: 'debug',
    LogFormatter: color.red,
  },
  log: { level: 'log' },
} satisfies Record<string, LogType>;
