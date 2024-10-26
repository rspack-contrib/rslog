import { finalLog, getLabel } from './utils';
import { createLogger as rawCreateLogger } from '../createLogger';
import { gradient } from './gradient';
import type { Options, } from '../types';
import { LOG_TYPES } from './constants'

export function createLogger(options: Options = {},) {
   return rawCreateLogger(options, {
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