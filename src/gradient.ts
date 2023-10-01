// RGB for #bdfff3
const startColor = [189, 255, 243];
// RGB for #4ac29a
const endColor = [74, 194, 154];

export function gradient(message: string) {
  const steps = message.length;
  const colorStep = [
    (endColor[0] - startColor[0]) / steps,
    (endColor[1] - startColor[1]) / steps,
    (endColor[2] - startColor[2]) / steps,
  ];

  let output = '';
  for (let i = 0; i < steps; i++) {
    const r = Math.round(startColor[0] + colorStep[0] * i);
    const g = Math.round(startColor[1] + colorStep[1] * i);
    const b = Math.round(startColor[2] + colorStep[2] * i);
    const colorCode = `\x1b[38;2;${r};${g};${b}m`;
    const resetCode = '\x1b[0m';

    output += `${colorCode}${message[i]}${resetCode}`;
  }

  return output;
}
