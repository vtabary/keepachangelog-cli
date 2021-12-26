# Keep a changelog cli

![Test status](https://github.com/vtabary/keepachangelog-cli/workflows/Test/badge.svg)
[![Npm package version](https://img.shields.io/npm/v/@vtabary/keepachangelog-cli)](https://npmjs.com/package/@vtabary/keepachangelog-cli)
![NPM Downloads](https://img.shields.io/npm/dw/@vtabary/keepachangelog-cli)
![NPM License](https://img.shields.io/npm/l/@vtabary/keepachangelog-cli)

Made to update the `CHANGELOG.md` file when creating a new library version.

The `CHANGELOG.md` file should be based on the [Keepachangelog conventions](https://keepachangelog.com).

## Usage

```bash
$ npx keepachangelog -h
Usage: keepachangelog [options] [command]

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  release [options] [number]  add a new entry. When no number is provided, it will try to use the npm_package_version instead.
  help [command]              display help for command
```

## Examples

### Add a version to the CHANGELOG file with a user confirmation

```bash
npx keepachangelog release <version> -c
```

### Update the CHANGELOG file on NPM version

It can be used in the `scripts` of the package.json file, using the given environment variable `npm_package_version`:

```json
{
  ...
  "scripts": {
    // Update the CHANGELOG.md file and add it to the staged files
    "version": "keepachangelog release $npm_package_version -c && git add ./CHANGELOG.md",
    // Optional: Add the updated file to the commit dedicated to the version, and push the modification to the origin repository
    "postversion": "git push origin HEAD && git push origin v$npm_package_version",
  }
  ...
}
```

## TODO

- Add a confirmation before creating a new version
- Display the message in the unreleased section
- Extract the messages for a specific version
- Validate the changelog file format

## LICENSE

[MIT](LICENSE)
