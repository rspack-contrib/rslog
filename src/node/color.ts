import { colorLevel } from './utils';
import type { ColorFn } from '../types';

let formatter = (open: string, close: string, replace = open): ColorFn =>
  colorLevel >= 2
    ? input => {
        let string = '' + input;
        let index = string.indexOf(close, open.length);
        return ~index
          ? [open + replaceClose(string, close, replace, index) + close]
          : [open + string + close];
      }
    : input => {
        return [String(input)];
      };

let replaceClose = (
  string: string,
  close: string,
  replace: string,
  index: number,
): string => {
  let start = string.substring(0, index) + replace;
  let end = string.substring(index + close.length);
  let nextIndex = end.indexOf(close);
  return ~nextIndex
    ? start + replaceClose(end, close, replace, nextIndex)
    : start + end;
};

export const bold = formatter('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m');
export const red = formatter('\x1b[31m', '\x1b[39m');
export const green = formatter('\x1b[32m', '\x1b[39m');
export const yellow = formatter('\x1b[33m', '\x1b[39m');
export const magenta = formatter('\x1b[35m', '\x1b[39m');
export const cyan = formatter('\x1b[36m', '\x1b[39m');
export const gray = formatter('\x1b[90m', '\x1b[39m');
