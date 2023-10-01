import color from 'picocolors';
import type { LogType } from './types';

export const LOG_LEVEL = {
  error: 0,
  warn: 1,
  info: 2,
  log: 3,
  verbose: 4,
} as const;

export const LOG_TYPES = {
  // Level error
  error: {
    label: 'error',
    level: 'error',
    formatter: color.red,
  },
  // Level warn
  warn: {
    label: 'warn',
    level: 'warn',
    formatter: color.yellow,
  },
  // Level info
  info: {
    label: 'info',
    level: 'info',
    formatter: color.cyan,
  },
  start: {
    label: 'start',
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
  // Level log
  log: {
    level: 'log',
  },
  // Level debug
  debug: {
    label: 'debug',
    level: 'verbose',
    formatter: color.magenta,
  },
} satisfies Record<string, LogType>;
