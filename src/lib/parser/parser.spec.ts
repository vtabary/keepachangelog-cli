import { parseSummary } from './parser';

describe('parseSummary', () => {
  let content: string;

  beforeEach(() => {
    content = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- test 4

## [0.3.0] - 2021-12-26

### Added

- test 3

### Fixed

- test 2

## [0.2.1] - 2021-12-22

### Fixed

- test 1
`;
  });

  it('should return undefined when no matching block is found', () => {
    expect(parseSummary(content, '0.4.0')).toBeUndefined();
  });

  it('should return the matching block', () => {
    expect(parseSummary(content, '0.3.0')).toEqual(`
### Added

- test 3

### Fixed

- test 2

`);
  });

  it('should return the blocks matching a non semver version', () => {
    expect(parseSummary(content, 'unreleased')).toEqual(
      `
### Added

- test 4

`
    );
  });
});
