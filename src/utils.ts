let errorStackRegExp = /at\s.*:\d+:\d+[\s\)]*$/;
let anonymousErrorStackRegExp = /at\s.*\(<anonymous>\)$/;

export let isErrorStackMessage = (message: string) =>
  errorStackRegExp.test(message) || anonymousErrorStackRegExp.test(message);
