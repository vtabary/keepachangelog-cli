#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { Command } from 'commander';

const program = new Command();

program
  .command('replace <file>')
  .option(
    '--current-version',
    'Current version',
    process.env.npm_package_version
  )
  .action(async (filePath, { currentVersion }) => {
    const content = (await readFile(filePath, { encoding: 'utf-8' })).replace(
      "'dev'",
      `'${currentVersion}'`
    );
    await writeFile(filePath, content, { encoding: 'utf-8' });
    console.log("Replaced version in '%s'", filePath);
  });

program.parse(process.argv);
