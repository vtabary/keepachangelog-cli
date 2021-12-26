import { yellow, green, red, gray } from 'chalk';

export const format = (summary = ''): string => {
  return colorize(compress(summary));
};

const COLORS: { [category: string]: (value: string) => string } = {
  changed: red,
  removed: red,
  added: yellow,
  fixed: green,
  deprecated: green,
  security: green,
  default: gray,
};

const colorize = (summary: string): string => {
  return summary.replace(
    /^### (?<category>.*)/gm,
    (match: string, category: string) => {
      return (COLORS[category.toLocaleLowerCase()] || COLORS['default'])(match);
    }
  );
};

const compress = (summary: string): string => {
  return summary.trim().replace(/\n{2,}/gm, '\n');
};
