import supportsColor from 'supports-color';

// https://github.com/chalk/supports-color
export const colorLevel = supportsColor.stdout ? supportsColor.stdout.level : 0;

let errorStackRegExp = /at\s.*:\d+:\d+[\s\)]*$/;
let anonymousErrorStackRegExp = /at\s.*\(<anonymous>\)$/;
let indexErrorStackRegExp = /at\s.*\(index\s\d+\)$/;

export let isErrorStackMessage = (message: string) =>
  errorStackRegExp.test(message) ||
  anonymousErrorStackRegExp.test(message) ||
  indexErrorStackRegExp.test(message);
