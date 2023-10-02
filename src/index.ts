import { createLogger } from './createLogger';

export { createLogger } from './createLogger';

export let logger = createLogger();

export type {
  Options,
  Logger,
  LogType,
  LogLevel,
  LogMessage,
  LogFunction,
} from './types';
