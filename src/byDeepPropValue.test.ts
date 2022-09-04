import { byDeepPropValue } from './byDeepPropValue';

describe('byDeepPropValue', () => {
  describe('matching primitive value types', () => {
    it('should return true for a first level matching prop value', () => {
      const obj = {
        propA: 'a',
      };

      const subject = byDeepPropValue('propA', 'a');
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return true for a second level matching prop value', () => {
      const obj = {
        propA: {
          propAA: 'aa',
        },
      };

      const subject = byDeepPropValue('propA.propAA', 'aa');
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return true for a third level matching prop value', () => {
      const obj = {
        propA: {
          propAA: {
            propAAA: 'aaa',
          },
        },
      };

      const subject = byDeepPropValue('propA.propAA.propAAA', 'aaa');
      const result = subject(obj);

      expect(result).toBe(true);
    });

    it('should return true for a fourth level matching prop value', () => {
      const obj = {
        propA: {
          propAA: {
            propAAA: {
              propAAAA: 'aaaa',
            },
          },
        },
      };

      const subject = byDeepPropValue('propA.propAA.propAAA.propAAAA', 'aaaa');
      const result = subject(obj);

      expect(result).toBe(true);
    });

    // it('should return false when not matching a number prop value', () => {
    //   interface Obj {
    //     prop: number;
    //   }
    //   const obj: Obj = {
    //     prop: 0,
    //   };

    //   const subject = byPropValue('prop', 1);
    //   const result = subject(obj);

    //   expect(result).toBe(false);
    // });

    // it('should return true for a matching boolean prop value of true', () => {
    //   interface Obj {
    //     prop: boolean;
    //   }
    //   const obj: Obj = {
    //     prop: true,
    //   };

    //   const subject = byPropValue('prop', true);
    //   const result = subject(obj);

    //   expect(result).toBe(true);
    // });

    // it('should return true for a matching boolean prop value of false', () => {
    //   interface Obj {
    //     prop: boolean;
    //   }
    //   const obj: Obj = {
    //     prop: false,
    //   };

    //   const subject = byPropValue('prop', false);
    //   const result = subject(obj);

    //   expect(result).toBe(true);
    // });

    // it('should return true for a matching string prop value', () => {
    //   interface Obj {
    //     prop: string;
    //   }
    //   const obj: Obj = {
    //     prop: 'value',
    //   };

    //   const subject = byPropValue('prop', 'value');
    //   const result = subject(obj);

    //   expect(result).toBe(true);
    // });

    // it('should return false for no matching string prop value', () => {
    //   interface Obj {
    //     prop: string;
    //   }
    //   const obj: Obj = {
    //     prop: 'value',
    //   };

    //   const subject = byPropValue('prop', 'otherValue');
    //   const result = subject(obj);

    //   expect(result).toBe(false);
    // });

    // it('should return false if the prop value and value are of different types', () => {
    //   interface Obj {
    //     prop: string | number;
    //   }
    //   const obj: Obj = {
    //     prop: 0,
    //   };

    //   const subject = byPropValue('prop', '0');
    //   const result = subject(obj);

    //   expect(result).toBe(false);
    // });
  });
});
