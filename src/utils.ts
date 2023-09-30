const errorStackRegExp = /^\s*at\s.*:\d+:\d+[\s)]*$/;
const anonymousErrorStackRegExp = /^\s*at\s.*\(<anonymous>\)$/;

export const isErrorStackMessage = (message: string) =>
  errorStackRegExp.test(message) || anonymousErrorStackRegExp.test(message);
