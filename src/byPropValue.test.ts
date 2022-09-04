import { byPropValue } from './byPropValue';

describe('byPropValue - single level', () => {
  describe('matching primitive value types', () => {
    it('should return false if an object is undefined', () => {
      const subject = byPropValue('propA', 'a');
      // @ts-expect-error
      const result = subject(undefined);

      expect(result).toBe(false);
    });

    it('should return true for a matching number prop value', () => {
      interface Obj {
        prop: number;
      }
      const obj: Obj = {
        prop: 0,
      };

      const subject = byPropValue('prop', 0);
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return false when not matching a number prop value', () => {
      interface Obj {
        prop: number;
      }
      const obj: Obj = {
        prop: 0,
      };

      const subject = byPropValue('prop', 1);
      const result = subject(obj);

      expect(result).toBe(false);
    });

    it('should return true for a matching boolean prop value of true', () => {
      interface Obj {
        prop: boolean;
      }
      const obj: Obj = {
        prop: true,
      };

      const subject = byPropValue('prop', true);
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return true for a matching boolean prop value of false', () => {
      interface Obj {
        prop: boolean;
      }
      const obj: Obj = {
        prop: false,
      };

      const subject = byPropValue('prop', false);
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return true for a matching string prop value', () => {
      interface Obj {
        prop: string;
      }
      const obj: Obj = {
        prop: 'value',
      };

      const subject = byPropValue('prop', 'value');
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return false for no matching string prop value', () => {
      interface Obj {
        prop: string;
      }
      const obj: Obj = {
        prop: 'value',
      };

      const subject = byPropValue('prop', 'otherValue');
      const result = subject(obj);

      expect(result).toBe(false);
    });

    it('should return false if the prop value and value are of different types', () => {
      interface Obj {
        prop: string | number;
      }
      const obj: Obj = {
        prop: 0,
      };

      const subject = byPropValue('prop', '0');
      const result = subject(obj);

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

      const subject = byPropValue('prop', valueObj);
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

      const subject = byPropValue('prop', {});
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

      const subject = byPropValue('prop', valueArray);
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

      const subject = byPropValue('prop', []);
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

      const subject = byPropValue('prop', 'VALUE', {
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

      const subject = byPropValue('prop', 'otherValue', {
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

      const subject = byPropValue('prop', 'VALUE');
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

      const subject = byPropValue('prop', 'VALUE', {
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
      const subject = byPropValue('propA', 'not-undefined');
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

      const subject = byPropValue('propA', undefined, { matchUndefined: true });
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

      const subject = byPropValue('propA', undefined, {
        matchUndefined: false,
      });
      const result = subject(obj0);

      expect(result).toBe(false);
    });
  });
});

describe('byPropValue - nested level', () => {
  describe('matching primitive value types', () => {
    it('should return true for a second level matching prop value', () => {
      const obj = {
        first: {
          second: 'value',
        },
      };

      const subject = byPropValue('first.second', 'value');
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

      const subject = byPropValue('first.second.third', 'value');
      const result = subject(obj);

      expect(result).toBe(true);
    });
  });
});
