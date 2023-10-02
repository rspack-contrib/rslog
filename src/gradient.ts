import { bold } from './color';
import { isColorSupported } from './utils';

// RGB for #bdfff3
let startColor = [189, 255, 243];
// RGB for #4ac29a
let endColor = [74, 194, 154];

export function gradient(message: string) {
  if (!isColorSupported) {
    return message;
  }

  let steps = message.length;
  let colorStep = [
    (endColor[0] - startColor[0]) / steps,
    (endColor[1] - startColor[1]) / steps,
    (endColor[2] - startColor[2]) / steps,
  ];

  let output = '';
  for (let i = 0; i < steps; i++) {
    let r = Math.round(startColor[0] + colorStep[0] * i);
    let g = Math.round(startColor[1] + colorStep[1] * i);
    let b = Math.round(startColor[2] + colorStep[2] * i);
    output += `\x1b[38;2;${r};${g};${b}m${message[i]}\x1b[39m`;
  }

  return bold(output);
}
