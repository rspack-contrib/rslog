import type { LogType } from '../types';
import { red , yellow , cyan , green , magenta  } from './color';

export let LOG_TYPES = {
  // Level error
  error: {
    label: 'error',
    level: 'error',
    color:  red,
  },
  // Level warn
  warn: {
    label: 'warn',
    level: 'warn',
    color:  yellow,
  },
  // Level info
  info: {
    label: 'info',
    level: 'info',
    color:  cyan,
  },
  start: {
    label: 'start',
    level: 'info',
    color:  cyan,
  },
  ready: {
    label: 'ready',
    level: 'info',
    color:  green,
  },
  success: {
    label: 'success',
    level: 'info',
    color:  green,
  },
  // Level log
  log: {
    level: 'log',
  },
  // Level debug
  debug: {
    label: 'debug',
    level: 'verbose',
    color:  magenta,
  },
} satisfies Record<string, LogType>;
