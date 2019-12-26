import { promises as fs } from 'fs';
import * as path from 'path';

export class Release {
  private filePath: string;

  constructor(private options: {
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
    return fs.readFile(path.join(process.cwd(), this.filePath), { encoding: 'utf-8' });
  }

  private async write(data: string): Promise<void> {
    return fs.writeFile(path.join(process.cwd(), this.filePath), data, { encoding: 'utf-8' });
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
