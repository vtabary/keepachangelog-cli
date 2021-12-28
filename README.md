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
  confirm [options] [number]  ask the user a confirmation before creating the new version
  display [options] [number]  display the summary of the changelog for a specific version. Can take a semver version number or "unreleased" as an argument. Default will be unreleased
  help [command]              display help for command
```

## Examples

### Add a version to the CHANGELOG file with a user confirmation

```bash
npx keepachangelog release <version> -c
```

### Update the CHANGELOG file on NPM version

It can be used in the `scripts` of the package.json file, using the given environment variable `npm_new_version`:

```json
{
  ...
  "scripts": {
    // Update the CHANGELOG.md file and add it to the staged files
    // Use $npm_new_version and $npm_old_version with npm 7+ on Linux, or $npm_package_version with npm 6.x
    // Use the format %npm_new_version% on Windows
    // The `--current-version` option is optional since the cli can read the package.json file
    "preversion": "keepachangelog display unreleased && keepachangelog confirm $npm_new_version --current-version $npm_old_version",
    "version": "keepachangelog release $npm_new_version && git add ./CHANGELOG.md",
    // Optional: Add the updated file to the commit dedicated to the version, and push the modification to the origin repository
    "postversion": "git push origin HEAD && git push origin v$npm_new_version",
  }
  ...
}
```

## TODO

- Validate the changelog file format
- Add options to `confirm` command to display the unreleased messages

## LICENSE

[MIT](LICENSE)
