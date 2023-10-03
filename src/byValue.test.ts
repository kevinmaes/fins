import { byValue } from './byValue';

describe.only('byValue', () => {
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
  });
});
