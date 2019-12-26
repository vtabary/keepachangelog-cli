import commander from 'commander';
import { Release } from '../lib/release';

const program = new commander.Command();
program.version('0.0.1');

program.command('release [number]')
  .description('add a new entry ')
  .option('-f, --file <file_path>', 'changelog file path', undefined, './CHANGELOG.md')
  .action((number?: string, options: {
    filePath?: string;
  } = {}) => {
    return new Release({
      filePath: options.filePath,
    }).process({
      number,
    });
  });

program.parse(process.argv);
