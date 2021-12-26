import * as path from 'path';
import { WRAPPERS, Release } from './release';

describe('Release', () => {
  describe('#new', () => {
    it('should create an instance without arguments', () => {
      expect(() => new Release()).not.toThrow();
    });

    it('should create an instance with a empty object', () => {
      expect(() => new Release({})).not.toThrow();
    });

    it('should create an instance with the file path', () => {
      expect(
        () =>
          new Release({
            filePath: 'test',
          })
      ).not.toThrow();
    });
  });

  describe('#release', () => {
    let release: Release;
    let spyRead: jest.SpyInstance;
    let spyWrite: jest.SpyInstance;

    beforeEach(() => {
      spyRead = jest.spyOn(WRAPPERS, 'readFile');
      spyRead.mockImplementation(() => Promise.resolve('test'));
      spyWrite = jest.spyOn(WRAPPERS, 'writeFile');
      spyWrite.mockImplementation(() => Promise.resolve());
      jest.spyOn(process, 'cwd').mockReturnValue(path.join('/', 'root'));
    });

    it('should reject when the new version number is missing', () => {
      release = new Release();
      return expect(
        release.release({ versionNumber: undefined })
      ).rejects.toThrow();
    });

    describe('with the default path', () => {
      beforeEach(async () => {
        release = new Release();
        await release.release({ versionNumber: '1.0.0' });
      });

      it('should read the default file', () => {
        expect(spyRead).toHaveBeenCalledWith(
          path.resolve('/root/CHANGELOG.md'),
          { encoding: 'utf-8' }
        );
      });

      it('should write the default file', () => {
        expect(spyWrite).toHaveBeenCalledWith(
          path.resolve('/root/CHANGELOG.md'),
          'test',
          { encoding: 'utf-8' }
        );
      });
    });

    describe('with the custom path', () => {
      beforeEach(async () => {
        release = new Release({
          filePath: './custom-path',
        });
        await release.release({ versionNumber: '1.0.0' });
      });

      it('should read the default file', () => {
        expect(spyRead).toHaveBeenCalledWith(
          path.resolve('/root/custom-path'),
          { encoding: 'utf-8' }
        );
      });

      it('should write the default file', () => {
        expect(spyWrite).toHaveBeenCalledWith(
          path.join('/root/custom-path'),
          'test',
          { encoding: 'utf-8' }
        );
      });
    });

    describe('with an absolute path', () => {
      beforeEach(async () => {
        release = new Release({
          filePath: '/custom-path',
        });
        await release.release({ versionNumber: '1.0.0' });
      });

      it('should read the default file', () => {
        expect(spyRead).toHaveBeenCalledWith(path.resolve('/custom-path'), {
          encoding: 'utf-8',
        });
      });

      it('should write the default file', () => {
        expect(spyWrite).toHaveBeenCalledWith(
          path.join('/custom-path'),
          'test',
          { encoding: 'utf-8' }
        );
      });
    });

    describe('should add an entry', () => {
      let date: string;

      beforeEach(() => {
        date = new Date().toISOString().slice(0, 10);
        spyRead.mockClear().mockImplementation(() =>
          Promise.resolve(`# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Some message

## [0.1.0] - Date
`)
        );
        release = new Release();
      });

      it('with the given number', async () => {
        await release.release({ versionNumber: '1.0.0' });
        expect(spyWrite.mock.calls[0][1]).toEqual(`# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - ${date}
### Fixed
- Some message

## [0.1.0] - Date
`);
      });
    });
  });
});
