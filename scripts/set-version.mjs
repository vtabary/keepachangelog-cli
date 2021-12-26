#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { Command } from 'commander';
import { resolve } from 'node:path';

const program = new Command();

program.command('replace <file>').action(async (filePath) => {
  const version = JSON.parse(await readFile(resolve('./package.json'))).version;
  const content = (await readFile(filePath, { encoding: 'utf-8' })).replace(
    "'dev'",
    `'${version}'`
  );
  await writeFile(filePath, content, { encoding: 'utf-8' });
  console.log("Replaced version in '%s'", filePath);
});

program.parse(process.argv);
