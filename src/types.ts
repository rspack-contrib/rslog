import type { ColorFn } from './color';

export type LogLevel = 'error' | 'warn' | 'info' | 'log' | 'verbose';

export type LogMessage = number | string | Error | null;

export interface LogType {
  label?: string;
  level: LogLevel;
  color?: ColorFn;
}

export type LogFunction = (message?: LogMessage, ...args: any[]) => void;

export interface Options {
  level?: LogLevel;
}
