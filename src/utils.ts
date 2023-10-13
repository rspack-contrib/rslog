import supportsColor from 'supports-color';

// https://github.com/chalk/supports-color
export const colorLevel = supportsColor.stdout ? supportsColor.stdout.level : 0;

let errorStackRegExp = /^\s*at\s.*:\d+:\d+[\s)]*$/;
let anonymousErrorStackRegExp = /^\s*at\s.*\(<anonymous>\)$/;

export let isErrorStackMessage = (message: string) =>
  errorStackRegExp.test(message) || anonymousErrorStackRegExp.test(message);
