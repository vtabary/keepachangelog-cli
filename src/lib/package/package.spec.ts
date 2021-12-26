import { resolve } from 'path';
import {
  getCurrentVersion,
  getPackageContent,
  getPackagePath,
  getPackageVersion,
} from './package';

describe('getCurrentVersion', () => {
  describe('when a version is provided', () => {
    it('should return the provided version', () => {
      return expect(
        getCurrentVersion('test', {
          cwd: resolve('samples/malformed/package.json'),
        })
      ).resolves.toEqual('test');
    });
  });

  describe('when no version is provided', () => {
    it('should return the current version', () => {
      return expect(
        getCurrentVersion(undefined, {
          cwd: resolve('samples/valid/package.json'),
        })
      ).resolves.toEqual('test');
    });

    it('should return undefined when the package.json file is not existing', () => {
      return expect(
        getCurrentVersion(undefined, {
          cwd: '/',
        })
      ).resolves.toBeUndefined();
    });

    it('should throw when the package.json file is malformed', () => {
      return expect(
        getCurrentVersion(undefined, {
          cwd: resolve('./samples/malformed/package.json'),
        })
      ).rejects.toThrow();
    });
  });
});

describe('getPackageVersion', () => {
  it('should return the current version', () => {
    return expect(
      getPackageVersion({
        cwd: resolve('samples/valid'),
      })
    ).resolves.toEqual('test');
  });

  it('should return undefined when the package.json file is not existing', () => {
    return expect(
      getPackageVersion({
        cwd: '/',
      })
    ).resolves.toBeUndefined();
  });

  it('should throw when the package.json file is malformed', () => {
    return expect(
      getPackageVersion({
        cwd: resolve('./samples/malformed'),
      })
    ).rejects.toThrow();
  });
});

describe('getPackageContent', () => {
  it('should return the current package.json content', () => {
    return expect(
      getPackageContent(resolve('samples/valid/package.json'))
    ).resolves.toEqual({
      version: 'test',
    });
  });

  it('should throw when the package.json file is not existing', () => {
    return expect(
      getPackageContent(resolve('./samples/missing_folder/package.json'))
    ).rejects.toThrow();
  });

  it('should throw when the package.json file is malformed', () => {
    return expect(
      getPackageContent(resolve('./samples/malformed/package.json'))
    ).rejects.toThrow();
  });
});

describe('getPackagePath', () => {
  it('should return the current package.json path', () => {
    return expect(getPackagePath()).resolves.toEqual(resolve('package.json'));
  });

  it('should return undefined when no package.json file is existing in the file tree', () => {
    return expect(getPackagePath('/')).resolves.toBeUndefined();
  });
});
