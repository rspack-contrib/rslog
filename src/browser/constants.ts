import type { LogType } from '../types';
import { red, orange, green, magenta, dodgerblue } from './color';

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
    color: orange,
  },
  // Level info
  info: {
    label: 'info',
    level: 'info',
    color: dodgerblue,
  },
  start: {
    label: 'start',
    level: 'info',
    color: dodgerblue,
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
  // Level log
  log: {
    level: 'log',
  },
  // Level debug
  debug: {
    label: 'debug',
    level: 'verbose',
    color: magenta,
  },
} satisfies Record<string, LogType>;
