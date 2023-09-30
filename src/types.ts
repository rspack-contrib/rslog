export type LogLevel = 'log' | 'debug' | 'info' | 'warn' | 'error';

export type LogMessage = number | string | Error | null;

export type LogFormatter = (
  input: string | number | null | undefined,
) => string;

export interface LogType {
  label?: string;
  level: LogLevel;
  LogFormatter?: LogFormatter;
}

export type LogFunction = (message?: LogMessage, ...args: any[]) => void;

export interface Options<T extends Record<string, LogType>> {
  level?: string;
  types?: T;
}
