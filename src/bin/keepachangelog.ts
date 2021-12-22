import commander from 'commander';
import { Release } from '../lib/release';

const program = new commander.Command();
program.version('0.0.1');

program
  .command('release [number]')
  .description(
    'add a new entry. When no number is provided, it will try to use the npm_package_version instead.'
  )
  .option('-f, --file <file_path>', 'changelog file path', './CHANGELOG.md')
  .action(
    (
      number: string,
      options: {
        filePath?: string;
      } = {}
    ) => {
      return new Release({
        filePath: options.filePath,
      }).process({
        versionNumber: number || process.env.npm_package_version,
      });
    }
  );

program.parse(process.argv);
