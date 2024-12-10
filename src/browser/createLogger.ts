import { finalLog, getLabel } from './utils';
import { createLogger as rawCreateLogger } from '../createLogger';
import { gradient } from './gradient';
import type { Options, } from '../types';
import { LOG_TYPES } from './constants'

function validateOptions(options: Options): Options {
   const validatedOptions = { ...options };
   if (options.labels && typeof options.labels !== 'object') {
      throw new Error('Labels must be an object');
   }
   if (options.level && typeof options.level !== 'string') {
      throw new Error('Level must be a string');
   }
   return validatedOptions;
}

export function createLogger(options: Options = {},) {
   const validatedOptions = validateOptions(options);
   return rawCreateLogger(validatedOptions, {
      handleError: (msg) => msg,
      getLabel,
      gradient,
      finalLog,
      LOG_TYPES,
      greet: (msg) => {
         return gradient(msg)
      }
   })
}