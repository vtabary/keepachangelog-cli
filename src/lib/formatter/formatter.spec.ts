import { yellow, green, red, gray } from 'chalk';
import { format } from './formatter';

describe('format', () => {
  it('should support an empty summary', () => {
    expect(format('')).toBe('');
  });

  it('should support an undefined summary', () => {
    expect(format()).toBe('');
  });

  it('should format the summary', () => {
    const summary = `
### Changed
- foo
- bar

### Removed
- baz

### Added
- qux

### Fixed
- quux

### Deprecated
- corge


### Security
- grault
### Other category
- garply

`;
    const expected = `${red('### Changed')}
- foo
- bar
${red('### Removed')}
- baz
${yellow('### Added')}
- qux
${green('### Fixed')}
- quux
${green('### Deprecated')}
- corge
${green('### Security')}
- grault
${gray('### Other category')}
- garply`;
    expect(format(summary)).toEqual(expected);
  });
});
