let errorStackRegExp = /^\s*at\s.*:\d+:\d+[\s)]*$/;
let anonymousErrorStackRegExp = /^\s*at\s.*\(<anonymous>\)$/;

export let isErrorStackMessage = (message: string) =>
  errorStackRegExp.test(message) || anonymousErrorStackRegExp.test(message);

let { env } = process;
export let isColorSupported =
  !('NO_COLOR' in env) &&
  ('FORCE_COLOR' in env ||
    process.platform === 'win32' ||
    (process.stdout.isTTY && env.TERM !== 'dumb') ||
    'CI' in env);
