import supportsColor from 'supports-color';
import { bold } from './color';
import type { LogMessage, LogType } from '../types'

// https://github.com/chalk/supports-color
export const colorLevel = supportsColor.stdout ? supportsColor.stdout.level : 0;

export function getLabel(logType: LogType){
    let label = '';
    if ('label' in logType) {
        label = (logType.label || '').padEnd(7);
        label = bold(logType.color ? logType.color(label)[0] : label)[0];
      }
  
    return [label]
  }
  
  export function finalLog(label:string[],text:string,args:string[],message?:LogMessage){
    const labelStr = label[0];
    //  gradient
    if(text && Array.isArray(message)){
    console.log(`${labelStr} ${message[0]}`);
    }else{
    console.log(labelStr.length ? `${labelStr} ${text}` : text, ...args);
    }
  }