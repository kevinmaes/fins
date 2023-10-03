import { byValue } from './byValue';

describe('byValue', () => {
  describe('matching primitive value types', () => {
    it('should return false if an object is undefined', () => {
      const subject = byValue(undefined);

      const result = subject(undefined);

      expect(result).toBe(false);
    });

    it('should return true if an object is undefined and option flag is set', () => {
      const subject = byValue(undefined, { matchUndefined: true });

      const result = subject(undefined);

      expect(result).toBe(true);
    });

    it('should return true if string values match as well as case', () => {
      const subject = byValue('test');

      const result = subject('test');

      expect(result).toBe(true);
    });

    it('should return false if string values match but case does not', () => {
      const subject = byValue('test');

      const result = subject('Test');

      expect(result).toBe(false);
    });

    it('should return true if string values match and caseInsensitive is specified', () => {
      const subject = byValue('test', { caseInsensitive: true });

      const result = subject('Test');

      expect(result).toBe(true);
    });
  });
});
