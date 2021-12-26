import { readFile, writeFile } from 'node:fs/promises';
import * as path from 'node:path';

export const WRAPPERS = {
  readFile,
  writeFile,
};

export class Release {
  private filePath: string;

  constructor(
    options: {
      filePath?: string;
    } = {}
  ) {
    this.filePath = options.filePath || './CHANGELOG.md';
  }

  public async release(options: { versionNumber?: string }): Promise<void> {
    if (!options.versionNumber) {
      return Promise.reject(new Error('Version number is missing'));
    }

    const changelog = await this.read();
    return this.write(this.replace(changelog, options.versionNumber));
  }

  private async read(): Promise<string> {
    return WRAPPERS.readFile(path.resolve(process.cwd(), this.filePath), {
      encoding: 'utf-8',
    });
  }

  private async write(data: string): Promise<void> {
    return WRAPPERS.writeFile(
      path.resolve(process.cwd(), this.filePath),
      data,
      { encoding: 'utf-8' }
    );
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
