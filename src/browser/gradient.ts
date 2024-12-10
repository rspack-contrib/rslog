import { supportColor } from './color'
const startColor = [189, 255, 243]; // RGB for #bdfff3
const endColor = [74, 194, 154];    // RGB for #4ac29a

const isWord = (char: string) => !/[\s\n]/.test(char);

export function gradient(message: string): string[] {
  if (!supportColor()) {
    return [message]
  }
  const chars: string[] = [...message];
  const words = chars.filter(isWord);
  const steps = words.length - 1;

  if (steps === 0) {
    return [`%c${message}`, `color: rgb(${startColor.join(',')}); font-weight: bold;`];
  }

  let output = '';
  let styles: string[] = [];

  chars.forEach((char) => {
    if (isWord(char)) {
      const progress = words.indexOf(char) / steps;
      const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * progress);
      const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * progress);
      const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * progress);

      output += `%c${char}`;
      styles.push(`color: rgb(${r},${g},${b}); font-weight: bold;`);
    } else {
      output += char;
    }
  });

  return [output, ...styles]
}