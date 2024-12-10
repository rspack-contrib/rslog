import type { Labels, LogMessage, LogMethods, LogType } from '../types'
import { bold } from './color';

export function getLabel(type: LogMethods, logType: LogType, labels: Labels) {
  let label = [''];
  if ('label' in logType) {
    const labelText = type !== 'log' ? labels[type] : undefined;
    label = [(labelText || logType.label || '')];
    
    if (logType.color) {
      const colorResult = logType.color(label[0]);
      if (Array.isArray(colorResult) && colorResult.length === 2) {
        label = bold([colorResult[0], colorResult[1]]);
      } else {
        label = bold(colorResult[0] || '');
      }
    } else {
      label = bold(label[0]);
    }
  }
  label = label.filter(Boolean);

  return label;
}

export function finalLog(label: string[], text: string, args: string[], message?: LogMessage) {
  if (label.length) {
    //  gradient
    if (Array.isArray(message)) {
      console.log(...label, ...message)
    } else {
      console.log(...label, text)
    }
  } else {
    Array.isArray(message) ? console.log(...message) : console.log(text, ...args)
  }
}