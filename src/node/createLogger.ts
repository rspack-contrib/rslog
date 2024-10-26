import {createLogger as rawCreateLogger} from '../createLogger';
import  {  gray    } from './color';
import  { gradient   } from './gradient';
import  { finalLog   , getLabel   } from './utils';
import {LOG_TYPES} from './constants'
import type { Options,  } from '../types';

export function createLogger (options: Options = {},){
   return rawCreateLogger(options,{
      handleError:(msg)=>{
      const res = gray(msg);
      return Array.isArray(res) ? `${res[0]}` : `${res}`
   },
    getLabel,
    gradient,
    finalLog,
    LOG_TYPES,
    greet:(msg)=>{
     return gradient(msg)[0]
    }
   })
}