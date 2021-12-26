#!/usr/bin/env node

import { resolve } from 'path';
import { Command } from 'commander';
import { VERSION } from '../data/version';
import { confirmVersion } from '../lib/confirm/confirm';
import { Release } from '../lib/release/release';
import { getCurrentVersion } from '../lib/package/package';

const program = new Command();
program.version(VERSION);

program
  .command('release [number]')
  .description(
    'add a new entry. When no number is provided, it will try to use the npm_package_version instead.'
  )
  .option(
    '-f, --file <file_path>',
    'changelog file path',
    resolve('./CHANGELOG.md')
  )
  .option(
    '--cwd <directory>',
    'set the current working directory',
    process.cwd()
  )
  .action(
    async (
      number: string,
      options: {
        file: string;
        cwd: string;
      }
    ) => {
      return new Release({
        filePath: resolve(options.cwd, options.file),
      }).release({
        versionNumber:
          number ||
          // From npm 7+
          process.env.npm_new_version ||
          // From npm 6+
          process.env.npm_package_version,
      });
    }
  );

program
  .command('confirm [number]')
  .description('ask the user a confirmation before creating the new version')
  .option(
    '--current-version',
    'force the current package version. By default, will try to extract the version from the package.json',
    process.env.npm_old_version || process.env.npm_package_version
  )
  .option(
    '--cwd <directory>',
    'set the current working directory',
    process.cwd()
  )
  .action(
    async (
      number: string,
      options: {
        currentVersion?: string;
        cwd: string;
      }
    ) => {
      if (
        !(await confirmVersion(
          number,
          await getCurrentVersion(options.currentVersion, { cwd: options.cwd })
        ))
      ) {
        console.error('Interrupted by user');
        process.exit(1);
      }
    }
  );

program.parse(process.argv);
