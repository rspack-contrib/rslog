import { isColorSupported } from './utils';
import type { LogFormatter } from './types';

let formatter =
  (open: string, close: string, replace = open): LogFormatter =>
  input => {
    let string = '' + input;
    let index = string.indexOf(close, open.length);
    return ~index
      ? open + replaceClose(string, close, replace, index) + close
      : open + string + close;
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

export let color = {
  bold: isColorSupported
    ? formatter('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m')
    : String,
  red: isColorSupported ? formatter('\x1b[31m', '\x1b[39m') : String,
  green: isColorSupported ? formatter('\x1b[32m', '\x1b[39m') : String,
  yellow: isColorSupported ? formatter('\x1b[33m', '\x1b[39m') : String,
  magenta: isColorSupported ? formatter('\x1b[35m', '\x1b[39m') : String,
  cyan: isColorSupported ? formatter('\x1b[36m', '\x1b[39m') : String,
  gray: isColorSupported ? formatter('\x1b[90m', '\x1b[39m') : String,
};
