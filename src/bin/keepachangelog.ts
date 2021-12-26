#!/usr/bin/env node

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
  .option('-f, --file <file_path>', 'changelog file path', './CHANGELOG.md')
  .option(
    '-c, --confirm',
    'add a confirmation before creating the new version',
    false
  )
  .option(
    '--current-version',
    'force the current package version. By default, will try to extract the version from the package.json'
  )
  .option('--cwd', 'set the current working directory', false)
  .action(
    async (
      number: string,
      options: {
        confirm: boolean;
        filePath?: string;
        cwd?: string;
        currentVersion?: string;
      }
    ) => {
      if (
        options.confirm &&
        !(await confirmVersion(
          number,
          await getCurrentVersion(options.currentVersion, { cwd: options.cwd })
        ))
      ) {
        console.error('Interrupted by user');
        process.exit(1);
      }
      return new Release({
        filePath: options.filePath,
      }).release({
        versionNumber: number || process.env.npm_package_version,
      });
    }
  );

program.parse(process.argv);
