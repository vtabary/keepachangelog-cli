/**
 * Extract the summary matching a version number
 */
export const parseSummary = (
  changelog: string,
  version: string
): string | undefined => {
  const regex = new RegExp(
    `^## \\[(?<version>${version})\\]( - (?<date>.*?))?\\n(?<summary>(\\S|\\s)+?)(?<nextversion>^## )`,
    'mi'
  );
  const match = changelog.match(regex);
  if (!match) {
    return undefined;
  }

  return match.groups?.summary;
};
