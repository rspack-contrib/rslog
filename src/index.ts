import { createLogger } from './createLogger.js';

export { createLogger };

export let logger = createLogger();

export type {
  Options,
  Logger,
  LogType,
  LogLevel,
  LogMessage,
  LogFunction,
} from './types.js';
