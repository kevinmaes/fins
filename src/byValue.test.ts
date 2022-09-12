import { byValue } from './byValue';

describe('byValue', () => {
  describe('matching primitive value types', () => {
    it('should return false if the value being checked is undefined', () => {
      const subject = byValue('a');

      // @ts-expect-error
      const result = subject(undefined);

      expect(result).toBe(false);
    });

    it('should return true for a matching number prop value', () => {
      const subject = byValue(0);

      const result = subject(0);

      expect(result).toBe(true);
    });

    it('should return false when not matching a number prop value', () => {
      const subject = byValue(1);

      const result = subject(0);

      expect(result).toBe(false);
    });

    it('should return true for a matching boolean prop value of true', () => {
      const subject = byValue(true);

      const result = subject(true);

      expect(result).toBe(true);
    });

    it('should return true for a matching boolean prop value of false', () => {
      const subject = byValue(false);

      const result = subject(false);

      expect(result).toBe(true);
    });

    it('should return true for a matching string prop value', () => {
      const subject = byValue('value');

      const result = subject('value');

      expect(result).toBe(true);
    });

    it('should return false for no matching string prop value', () => {
      const subject = byValue('otherValue');

      const result = subject('value');

      expect(result).toBe(false);
    });

    it('should return false if the prop value and value are of different types', () => {
      const subject = byValue('0');

      const result = subject(0);

      expect(result).toBe(false);
    });
  });

  describe('matching non-primitive value types', () => {
    it('should return true for a matching object value', () => {
      const valueObj = {};
      interface Obj {
        prop: typeof valueObj;
      }

      const obj: Obj = {
        prop: valueObj,
      };

      const subject = byValue('prop', valueObj);
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return false for a non-matching object value', () => {
      const valueObj = {};
      interface Obj {
        prop: typeof valueObj;
      }

      const obj: Obj = {
        prop: valueObj,
      };

      const subject = byValue('prop', {});
      const result = subject(obj);

      expect(result).toBe(false);
    });

    it('should return true for a matching array value', () => {
      const valueArray = [1, 2];
      interface Obj {
        prop: typeof valueArray;
      }

      const obj: Obj = {
        prop: valueArray,
      };

      const subject = byValue('prop', valueArray);
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return false for a non-matching array value', () => {
      const valueArray = [1, 2];
      interface Obj {
        prop: typeof valueArray;
      }

      const obj: Obj = {
        prop: valueArray,
      };

      const subject = byValue('prop', []);
      const result = subject(obj);

      expect(result).toBe(false);
    });
  });

  describe('matching with options arg', () => {
    it('should return true for a matching string prop value of different case when caseInsensitive option is true', () => {
      interface Obj {
        prop: string;
      }
      const obj: Obj = {
        prop: 'value',
      };

      const subject = byValue('prop', 'VALUE', {
        caseInsensitive: true,
      });
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return false for a non-matching string prop value when caseInsensitive option is true', () => {
      interface Obj {
        prop: string;
      }
      const obj: Obj = {
        prop: 'value',
      };

      const subject = byValue('prop', 'otherValue', {
        caseInsensitive: true,
      });
      const result = subject(obj);

      expect(result).toBe(false);
    });

    it('should return false for a similar string prop of different case', () => {
      interface Obj {
        prop: string;
      }
      const obj: Obj = {
        prop: 'value',
      };

      const subject = byValue('prop', 'VALUE');
      const result = subject(obj);

      expect(result).toBe(false);
    });

    it('should return false for no matching string prop value when caseInsensitive option is false', () => {
      interface Obj {
        prop: string;
      }
      const obj: Obj = {
        prop: 'value',
      };

      const subject = byValue('prop', 'VALUE', {
        caseInsensitive: false,
      });
      const result = subject(obj);

      expect(result).toBe(false);
    });

    it('should return false if an object prop value is undefined but the value passed is not undefined', () => {
      interface Obj {
        propA: undefined;
      }
      const obj0: Obj = {
        propA: undefined,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subject = byValue('propA', 'not-undefined');
      const result = subject(obj0);

      expect(result).toBe(false);
    });

    it('should return true if an object prop value and value are undefined and the matchUndefined option is true', () => {
      interface Obj {
        propA: undefined;
      }
      const obj0: Obj = {
        propA: undefined,
      };

      const subject = byValue('propA', undefined, { matchUndefined: true });
      const result = subject(obj0);

      expect(result).toBe(true);
    });

    it('should return false if an object prop value and value are undefined and the matchUndefined option is false', () => {
      interface Obj {
        propA: undefined;
      }
      const obj0: Obj = {
        propA: undefined,
      };

      const subject = byValue('propA', undefined, {
        matchUndefined: false,
      });
      const result = subject(obj0);

      expect(result).toBe(false);
    });
  });

  describe('nested level values', () => {
    it('should return true for a second level matching prop value', () => {
      const obj = {
        first: {
          second: 'value',
        },
      };

      const subject = byValue('first.second', 'value');
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return true for a third level matching prop value', () => {
      const obj = {
        first: {
          second: {
            third: 'value',
          },
        },
      };

      const subject = byValue('first.second.third', 'value');
      const result = subject(obj);

      expect(result).toBe(true);
    });
  });

  describe('arrays', () => {
    it('should find an array element by matching prop value', () => {
      const array = [{ prop: 'a' }, { prop: 'b' }, { prop: 'c' }];

      const result = array.find(byValue('prop', 'b'));

      expect(result).toEqual({ prop: 'b' });
    });

    it('should find an array element by matching nested prop value', () => {
      const array = [
        { first: { second: 'a' } },
        { first: { second: 'b' } },
        { first: { second: 'c' } },
      ];

      const result = array.find(byValue('first.second', 'b'));

      expect(result).toEqual({ first: { second: 'b' } });
    });
  });
});
