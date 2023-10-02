import { createLogger } from './createLogger';

export { createLogger } from './createLogger';

export let logger = createLogger();

export type {
  Options,
  LogType,
  LogLevel,
  LogMessage,
  LogFunction,
} from './types';
