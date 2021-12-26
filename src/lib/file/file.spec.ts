import * as path from 'path';
import { WRAPPERS, readChangelog, writeChangelog } from './file';

describe('#readChangelog', () => {
  let spyRead: jest.SpyInstance;

  beforeEach(() => {
    spyRead = jest.spyOn(WRAPPERS, 'readFile');
    spyRead.mockImplementation(() => Promise.resolve('test'));
  });

  it('should return the content', () => {
    return expect(readChangelog('./custom-path')).resolves.toEqual('test');
  });

  describe('using a relative path', () => {
    it('should read the default file', async () => {
      await readChangelog('./custom-path');
      expect(spyRead).toHaveBeenCalledWith(path.resolve('custom-path'), {
        encoding: 'utf-8',
      });
    });
  });

  describe('using an absolute path', () => {
    it('should read the default file', async () => {
      await readChangelog('/custom-path');
      expect(spyRead).toHaveBeenCalledWith('/custom-path', {
        encoding: 'utf-8',
      });
    });
  });
});

describe('#writeChangelog', () => {
  let spyWrite: jest.SpyInstance;

  beforeEach(() => {
    spyWrite = jest.spyOn(WRAPPERS, 'writeFile');
    spyWrite.mockImplementation(() => Promise.resolve());
  });

  it('should return nothing', () => {
    return expect(
      writeChangelog('test', './custom-path')
    ).resolves.toBeUndefined();
  });

  describe('using a relative path', () => {
    it('should write the default file', async () => {
      await writeChangelog('test', './custom-path');

      expect(spyWrite).toHaveBeenCalledWith(
        path.resolve('custom-path'),
        'test',
        { encoding: 'utf-8' }
      );
    });
  });

  describe('using an absolute path', () => {
    it('should write the default file', async () => {
      await writeChangelog('test', '/custom-path');

      expect(spyWrite).toHaveBeenCalledWith('/custom-path', 'test', {
        encoding: 'utf-8',
      });
    });
  });
});
