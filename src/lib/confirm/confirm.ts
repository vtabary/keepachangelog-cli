import { prompt } from 'inquirer';

export const confirmVersion = async (
  newVersion: string,
  currentVersion?: string
): Promise<boolean> => {
  if (!currentVersion) {
    currentVersion = '-none-';
    console.warn(
      'No current version has been found or specified. Check your package.json file or your command arguments.'
    );
  }

  return (
    await prompt({
      name: 'createVersion',
      type: 'confirm',
      message: `The version will be incremented from ${currentVersion} to ${newVersion}. Continue ?`,
    })
  ).createVersion;
};
