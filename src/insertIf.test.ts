import { insertIf } from './insertIf';

describe('utils/array.ts #insertIf()', () => {
  describe('matching primitive value types', () => {
    it('should insert a single element when predicate arg is true', () => {
      const subject = insertIf(1, true);

      const result = [0, ...subject, 2];

      expect(result).toEqual([0, 1, 2]);
    });

    it('should not insert a single element when predicate arg is false', () => {
      const subject = insertIf(1, false);

      const result = [0, ...subject, 2];

      expect(result).toEqual([0, 2]);
    });

    it('should insert an array of elements when predicate arg is true', () => {
      const subject = insertIf([1, 2], true);

      const result = [0, ...subject, 3];

      expect(result).toEqual([0, 1, 2, 3]);
    });

    it('should not insert an array of elements when predicate arg is true', () => {
      const subject = insertIf([1, 2], false);

      const result = [0, ...subject, 3];

      expect(result).toEqual([0, 3]);
    });

    it('should insert a nested array of elements when predicate arg is true (not flat)', () => {
      const subject = insertIf([[1, 2]], true);

      const result = [0, ...subject, 3];

      expect(result).toEqual([0, [1, 2], 3]);
    });

    it('should not insert a nested array of elements when predicate arg is false', () => {
      const subject = insertIf([[1, 2]], false);

      const result = [0, ...subject, 3];

      expect(result).toEqual([0, 3]);
    });

    it('should not insert any elements when if the predicate arg is non-boolean (even if truthy)', () => {
      const result = [
        0,
        // @ts-expect-error 2nd predicate arg is not a boolean
        ...insertIf(1, 'true'),
        // @ts-expect-error 2nd predicate arg is not a boolean
        ...insertIf(1, {}),
        // @ts-expect-error 2nd predicate arg is not a boolean
        ...insertIf(1, []),
        // @ts-expect-error 2nd predicate arg is not a boolean
        ...insertIf(1, 1),
        2,
      ];

      expect(result).toEqual([0, 2]);
    });
  });
});
