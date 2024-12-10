let supportsSubstitutions: boolean | undefined = undefined;

export const supportColor = () => {
  if (typeof supportsSubstitutions !== 'undefined') {
    return supportsSubstitutions;
  }
  
  const originalConsoleLog = console.log;
  try {
    const testString = 'color test';
    const css = 'color: red;';
    supportsSubstitutions = false;
    
    console.log = (...args) => {
      if (args[0] === `%c${testString}` && args[1] === css) {
        supportsSubstitutions = true;
      }
    };
    
    console.log(`%c${testString}`, css);
  } catch (e) {
    supportsSubstitutions = false;
  } finally {
    console.log = originalConsoleLog;
  }
  
  return supportsSubstitutions;
};

export type ColorFn = (input: string | number | null | undefined | [label: string, style: string]) => string[];

const ansiToCss = {
  'bold': 'font-weight: bold;',
  'red': 'color: red;',
  'green': 'color: green;',
  'orange': 'color: orange;',
  'dodgerblue': 'color: dodgerblue;',
  'magenta': 'color: magenta;',
  'gray': 'color: gray;',
};

let formatter = (key: keyof typeof ansiToCss): ColorFn =>
  supportColor()
    ? (input) => {
      if (Array.isArray(input)) {
        const [label, style] = input;
        return [`%c${label.replace('%c', '')}`, style ? `${ansiToCss[key]}${style}` : `${ansiToCss[key] || ''}`];
      }
      return [`%c${String(input).replace('%c', '')}`, ansiToCss[key] || ''];
    }
    : (input) => [String(input)];


export const bold = formatter('bold');
export const red = formatter('red');
export const green = formatter('green');
export const orange = formatter('orange');
export const dodgerblue = formatter('dodgerblue');
export const magenta = formatter('magenta');
export const gray = formatter('gray');