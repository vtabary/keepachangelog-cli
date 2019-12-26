import { promises as fs } from 'fs';
import * as path from 'path';

export const WRAPPERS = {
  readFile: fs.readFile,
  writeFile: fs.writeFile,
};

export class Release {
  private filePath: string;

  constructor(options: {
    filePath?: string;
  } = {}) {
    this.filePath = options.filePath || './CHANGELOG.md';
  }

  public async process(options: {
    number: string;
  }): Promise<void> {
    if (!options.number) {
      return Promise.reject(new Error('Version number is missing'));
    }

    const changelog = await this.read();
    return this.write(this.replace(changelog, options.number));
  }

  private async read(): Promise<string> {
    return WRAPPERS.readFile(path.resolve(this.filePath), { encoding: 'utf-8' });
  }

  private async write(data: string): Promise<void> {
    return WRAPPERS.writeFile(path.resolve(this.filePath), data, { encoding: 'utf-8' });
  }

  private replace(data: string, number: string): string {
    const regex = /## \[Unreleased\]/;
    const date = new Date().toISOString().slice(0, 10);

    return data.replace(regex, () => {
      return `## [Unreleased]

## [${number}] - ${date}`;
    });
  }
}
