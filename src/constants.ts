import { color } from './color';
import type { LogType } from './types';

export let LOG_LEVEL = {
  error: 0,
  warn: 1,
  info: 2,
  log: 3,
  verbose: 4,
} as const;

export let LOG_TYPES = {
  // Level error
  error: {
    label: 'error',
    level: 'error',
    color: color.red,
  },
  // Level warn
  warn: {
    label: 'warn',
    level: 'warn',
    color: color.yellow,
  },
  // Level info
  info: {
    label: 'info',
    level: 'info',
    color: color.cyan,
  },
  start: {
    label: 'start',
    level: 'info',
    color: color.cyan,
  },
  ready: {
    label: 'ready',
    level: 'info',
    color: color.green,
  },
  success: {
    label: 'success',
    level: 'info',
    color: color.green,
  },
  // Level log
  log: {
    level: 'log',
  },
  // Level debug
  debug: {
    label: 'debug',
    level: 'verbose',
    color: color.magenta,
  },
} satisfies Record<string, LogType>;
