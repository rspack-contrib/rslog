
let supportsSubstitutions:boolean|undefined = undefined;

export const supportColor = ()=>{
  if(typeof supportsSubstitutions!=='undefined'){
    return supportsSubstitutions;
  }
  try {
    console.log('%c', 'color:');  
    supportsSubstitutions = true;
  } catch (e) {
    supportsSubstitutions = false;
  }
  return supportsSubstitutions
};
export type ColorFn = (input: string | number | null | undefined| [label:string,style:string]) => string[];

const ansiToCss = {
  'bold': 'font-weight: bold;',
  'red': 'color: red;',
  'green': 'color: green;',
  'yellow': 'color: yellow;',
  'magenta': 'color: magenta;',
  'cyan': 'color: cyan;',
  'gray': 'color: gray;',
};

let formatter = (key: keyof typeof ansiToCss): ColorFn =>
  supportColor()
    ? (input) => {
        if(Array.isArray(input)){
          const [label,style] = input;
          return [`%c${label.replace('%c','')}`, style? `${ansiToCss[key]}${style}` : `${ansiToCss[key]|| '' }`];
        }
        return [`%c${String(input).replace('%c','')}`, ansiToCss[key] || ''];
      }
    : (input) => [String(input)];


export const bold = formatter('bold');
export const red = formatter('red');
export const green = formatter('green');
export const yellow = formatter('yellow');
export const magenta = formatter('magenta');
export const cyan = formatter('cyan');
export const gray = formatter('gray');