import inquirer from 'inquirer';
import { confirmVersion } from './confirm';

describe('confirmVersion', () => {
  beforeEach(() => {
    jest.spyOn(inquirer, 'prompt').mockResolvedValue({ createVersion: true });
    jest.spyOn(console, 'warn').mockImplementation();
  });

  it('should warn the user when no current version is provided', () => {
    expect(confirmVersion('1.0.0')).resolves.toBe(true);
    expect(console.warn).toHaveBeenCalledWith(
      'No current version has been found or specified. Check your package.json file or your command arguments.'
    );
  });

  it('should return true when the user accepts the creation', () => {
    expect(confirmVersion('1.0.0', '0.0.0')).resolves.toBe(true);
  });

  it('should return false when the user accepts the creation', () => {
    jest
      .spyOn(inquirer, 'prompt')
      .mockClear()
      .mockResolvedValue({ createVersion: false });
    expect(confirmVersion('1.0.0', '0.0.0')).resolves.toBe(false);
  });
});
