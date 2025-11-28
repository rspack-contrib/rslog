import supportsColor from 'supports-color';

// https://github.com/chalk/supports-color
export const colorLevel = supportsColor.stdout ? supportsColor.stdout.level : 0;

let errorStackRegExp = /at [^\r\n]*:\d+:\d+[\s\)]*$/;
let anonymousErrorStackRegExp = /at [^\r\n]*\(<anonymous>\)$/;
let indexErrorStackRegExp = /at [^\r\n]*\(index\s\d+\)$/;

export let isErrorStackMessage = (message: string) =>
  errorStackRegExp.test(message) ||
  anonymousErrorStackRegExp.test(message) ||
  indexErrorStackRegExp.test(message);
