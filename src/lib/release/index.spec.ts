import * as path from 'path';
import { WRAPPERS, Release } from './index';

describe('Release', () => {
  describe('#new', () => {
    it('should create an instance without arguments', () => {
      expect(() => new Release()).not.toThrow();
    });

    it('should create an instance with a empty object', () => {
      expect(() => new Release({})).not.toThrow();
    });

    it('should create an instance with the file path', () => {
      expect(() => new Release({
        filePath: 'test',
      })).not.toThrow();
    });
  });

  describe('#process', () => {
    let release: Release;
    let spyRead: jasmine.Spy;
    let spyWrite: jasmine.Spy;

    beforeEach(() => {
      spyRead = spyOn(WRAPPERS, 'readFile');
      spyRead.and.callFake(() => Promise.resolve('test'));
      spyWrite = spyOn(WRAPPERS, 'writeFile');
      spyWrite.and.callFake(() => Promise.resolve());
      spyOn(process, 'cwd').and.returnValue(path.join('/', 'root'));
    });

    describe('with the default path', () => {
      beforeEach(async () => {
        release = new Release();
        await release.process({ number: '1.0.0' });
      });

      it('should read the default file', () => {
        expect(spyRead).toHaveBeenCalledWith(path.resolve('/root/CHANGELOG.md'), { encoding: 'utf-8' });
      });

      it('should write the default file', () => {
        expect(spyWrite).toHaveBeenCalledWith(path.resolve('/root/CHANGELOG.md'), 'test', { encoding: 'utf-8' });
      });
    });

    describe('with the custom path', () => {
      beforeEach(async () => {
        release = new Release({
          filePath: './custom-path',
        });
        await release.process({ number: '1.0.0' });
      });

      it('should read the default file', () => {
        expect(spyRead).toHaveBeenCalledWith(path.resolve('/root/custom-path'), { encoding: 'utf-8' });
      });

      it('should write the default file', () => {
        expect(spyWrite).toHaveBeenCalledWith(path.join('/root/custom-path'), 'test', { encoding: 'utf-8' });
      });
    });

    describe('with an absolute path', () => {
      beforeEach(async () => {
        release = new Release({
          filePath: '/custom-path',
        });
        await release.process({ number: '1.0.0' });
      });

      it('should read the default file', () => {
        expect(spyRead).toHaveBeenCalledWith(path.resolve('/custom-path'), { encoding: 'utf-8' });
      });

      it('should write the default file', () => {
        expect(spyWrite).toHaveBeenCalledWith(path.join('/custom-path'), 'test', { encoding: 'utf-8' });
      });
    });

    it('should add an entry', async () => {
      const date = new Date().toISOString().slice(0, 10);
      spyRead.and.callFake(() => Promise.resolve(`# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Some message

## [0.1.0] - Date
`));
      release = new Release();
      await release.process({ number: '1.0.0' })
      expect(spyWrite.calls.first().args[1]).toEqual(`# Changelog
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
