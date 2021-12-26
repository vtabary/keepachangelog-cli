export const release = (data: string, versionNumber?: string): string => {
  if (!versionNumber) {
    throw new Error('Version number is missing');
  }

  const regex = /## \[Unreleased\]/;
  const date = new Date().toISOString().slice(0, 10);

  if (!data.match(regex)) {
    throw new Error('Missing Unreleased block');
  }

  return data.replace(regex, () => {
    return `## [Unreleased]

## [${versionNumber}] - ${date}`;
  });
};
