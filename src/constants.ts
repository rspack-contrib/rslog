import { red, yellow, cyan, green, magenta } from './color';
import type { LogType } from './types';

export let LOG_LEVEL = {
  silent: -1,
  error: 0,
  warn: 1,
  info: 2,
  // log is an alias of info
  log: 2,
  verbose: 3,
} as const;

export let LOG_TYPES = {
  // Level error
  error: {
    label: 'error',
    level: 'error',
    color: red,
  },
  // Level warn
  warn: {
    label: 'warn',
    level: 'warn',
    color: yellow,
  },
  // Level info
  info: {
    label: 'info',
    level: 'info',
    color: cyan,
  },
  start: {
    label: 'start',
    level: 'info',
    color: cyan,
  },
  ready: {
    label: 'ready',
    level: 'info',
    color: green,
  },
  success: {
    label: 'success',
    level: 'info',
    color: green,
  },
  log: {
    level: 'info',
  },
  // Level debug
  debug: {
    label: 'debug',
    level: 'verbose',
    color: magenta,
  },
} satisfies Record<string, LogType>;
