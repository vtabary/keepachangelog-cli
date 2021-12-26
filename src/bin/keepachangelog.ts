#!/usr/bin/env node

import { resolve } from 'path';
import { Command } from 'commander';
import { VERSION } from '../data/version';
import { confirmVersion } from '../lib/confirm/confirm';
import { release } from '../lib/release/release';
import { getCurrentVersion } from '../lib/package/package';
import { readChangelog, writeChangelog } from '../lib/file/file';
import { format } from '../lib/formatter/formatter';
import { parseSummary } from '../lib/parser/parser';

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
      const filePath = resolve(options.cwd, options.file);
      const content = release(
        await readChangelog(filePath),
        number ||
          // From npm 7+
          process.env.npm_new_version ||
          // From npm 6+
          process.env.npm_package_version
      );
      return writeChangelog(content, filePath);
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

program
  .command('display [number]')
  .description(
    'display the summary of the changelog for a specific version. Can take a semver version number or "unreleased" as an argument. Default will be unreleased'
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
      number: string | undefined,
      options: {
        file: string;
        cwd: string;
      }
    ) => {
      const filePath = resolve(options.cwd, options.file);
      const content = format(
        parseSummary(await readChangelog(filePath), number || 'unreleased')
      );

      if (content.length === 0) {
        return console.warn(`No message for version "${number}"`);
      }

      console.log(content);
    }
  );

program.parse(process.argv);
