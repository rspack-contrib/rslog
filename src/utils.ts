const errorStackRegExp = /^\s*at\s.*:\d+:\d+[\s)]*$/;
const anonymousErrorStackRegExp = /^\s*at\s.*\(<anonymous>\)$/;

export const isErrorStackMessage = (message: string) =>
  errorStackRegExp.test(message) || anonymousErrorStackRegExp.test(message);

export function getLongestLabelLength(labels: (string | undefined)[]) {
  let longestLabel = '';
  labels.forEach(label => {
    if (label && label.length > longestLabel.length) {
      longestLabel = label;
    }
  });
  return longestLabel.length;
}
