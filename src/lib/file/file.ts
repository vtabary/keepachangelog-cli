import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const WRAPPERS = {
  readFile,
  writeFile,
};

export const readChangelog = async (filePath: string): Promise<string> => {
  return WRAPPERS.readFile(resolve(filePath), {
    encoding: 'utf-8',
  });
};

export const writeChangelog = async (
  data: string,
  filePath: string
): Promise<void> => {
  return WRAPPERS.writeFile(resolve(filePath), data, {
    encoding: 'utf-8',
  });
};
