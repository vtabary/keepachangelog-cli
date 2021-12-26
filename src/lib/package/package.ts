import { readFile } from 'node:fs/promises';
import findUp from 'find-up';

export const getCurrentVersion = async (
  currentVersion?: string,
  options?: { cwd?: string }
): Promise<string | undefined> => {
  if (currentVersion) {
    return currentVersion;
  }

  return getPackageVersion(options);
};

export const getPackageVersion = async (
  options: { cwd?: string } = {}
): Promise<string | undefined> => {
  const packageJson = await getPackagePath(options.cwd);
  if (!packageJson) {
    return undefined;
  }

  return (await getPackageContent(packageJson)).version;
};

export const getPackageContent = async (
  packagePath: string
): Promise<{ version?: string }> => {
  const content = await readFile(packagePath, 'utf-8');
  return JSON.parse(content);
};

export const getPackagePath = async (cwd?: string) => {
  return findUp('package.json', { cwd });
};
