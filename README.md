# Keep a changelog cli

Made to update the `CHANGELOG.md` file when creating a new library version.

The `CHANGELOG.md` file should be based on the [Keepachangelog conventions](https://keepachangelog.com).

## Add a version to the CHANGELOG file

```
npx keepachangelog release <version>
```

## Install

It can be used in the `scripts` of the package.json file, using the given environment variable `npm_package_version`:

```json
{
  ...
  "scripts": {
    // Update the CHANGELOG.md file and add it to the staged files
    "version": "keepachangelog release $npm_package_version && git add ./CHANGELOG.md",
    // Add the updated file to the commit deicated to the version
    "postversion": "git push origin HEAD && git push origin $npm_package_version",
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
