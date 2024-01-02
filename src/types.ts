import type { ColorFn } from './color';
import type { LOG_TYPES } from './constants';

export type LogLevel = 'error' | 'warn' | 'info' | 'log' | 'verbose';

export type LogMessage = unknown;

export interface LogType {
  label?: string;
  level: LogLevel;
  color?: ColorFn;
}

export type LogFunction = (message?: LogMessage, ...args: any[]) => void;

export interface Options {
  level?: LogLevel;
}

export type LogMethods = keyof typeof LOG_TYPES;

export type Logger = Record<LogMethods, LogFunction> & {
  greet: (message: string) => void;
  level: LogLevel;
  override: (customLogger: Partial<Record<LogMethods, LogFunction>>) => void;
};
