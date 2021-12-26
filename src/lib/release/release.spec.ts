import { release } from './release';

describe('release', () => {
  let date: string;
  let content: string;

  beforeEach(() => {
    date = new Date().toISOString().slice(0, 10);
    content = `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Some message

## [0.1.0] - Date
`;
  });

  it('should throw when the new version number is missing', () => {
    return expect(() => release('')).toThrow();
  });

  it('should add an entry with the given number', () => {
    expect(release(content, '1.0.0')).toEqual(`# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - ${date}
### Fixed
- Some message

## [0.1.0] - Date
`);
  });

  it('should throw when no unreleased block is present', () => {
    content = `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - Date
`;

    expect(() => release(content, '1.0.0')).toThrow();
  });
});
