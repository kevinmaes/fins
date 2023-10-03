import { byPropValue } from './byPropValue';

describe('byPropValue', () => {
  describe('matching primitive value types', () => {
    it('should return false if an object is undefined', () => {
      const subject = byPropValue('propA', 'a');
      // @ts-expect-error
      const result = subject(undefined);

      expect(result).toBe(false);
    });

    it('should return true for a matching number prop value', () => {
      const subject = byPropValue('prop', 0);

      const result = subject({
        prop: 0,
      });

      expect(result).toBe(true);
    });

    it('should return false when not matching a number prop value', () => {
      const subject = byPropValue('prop', 1);

      const result = subject({
        prop: 0,
      });

      expect(result).toBe(false);
    });

    it('should return true for a matching boolean prop value of true', () => {
      const subject = byPropValue('prop', true);

      const result = subject({
        prop: true,
      });

      expect(result).toBe(true);
    });

    it('should return true for a matching boolean prop value of false', () => {
      const subject = byPropValue('prop', false);

      const result = subject({
        prop: false,
      });

      expect(result).toBe(true);
    });

    it('should return true for a matching string prop value', () => {
      const subject = byPropValue('prop', 'value');

      const result = subject({
        prop: 'value',
      });

      expect(result).toBe(true);
    });

    it('should return false for no matching string prop value', () => {
      const subject = byPropValue('prop', 'otherValue');

      const result = subject({
        prop: 'value',
      });

      expect(result).toBe(false);
    });

    it('should return false if the prop value and value are of different types', () => {
      const subject = byPropValue('prop', '0');

      const result = subject({
        prop: 0,
      });

      expect(result).toBe(false);
    });
  });

  describe('matching non-primitive value types', () => {
    it('should return true for a matching object value', () => {
      const valueObj = {};
      const subject = byPropValue('prop', valueObj);

      const result = subject({
        prop: valueObj,
      });

      expect(result).toBe(true);
    });

    it('should return false for a non-matching object value', () => {
      const valueObj = {};
      const subject = byPropValue('prop', {});

      const result = subject({
        prop: valueObj,
      });

      expect(result).toBe(false);
    });

    it('should return true for a matching array value', () => {
      const valueArray = [1, 2];
      const subject = byPropValue('prop', valueArray);

      const result = subject({
        prop: valueArray,
      });

      expect(result).toBe(true);
    });

    it('should return false for a non-matching array value', () => {
      const valueArray = [1, 2];
      const subject = byPropValue('prop', []);

      const result = subject({
        prop: valueArray,
      });

      expect(result).toBe(false);
    });
  });

  describe('matching with options arg', () => {
    it('should return true for a matching string prop value of different case when caseInsensitive option is true', () => {
      const subject = byPropValue('prop', 'VALUE', {
        caseInsensitive: true,
      });

      const result = subject({
        prop: 'value',
      });

      expect(result).toBe(true);
    });

    it('should return false for a non-matching string prop value when caseInsensitive option is true', () => {
      const subject = byPropValue('prop', 'otherValue', {
        caseInsensitive: true,
      });

      const result = subject({
        prop: 'value',
      });

      expect(result).toBe(false);
    });

    it('should return false for a similar string prop of different case', () => {
      const subject = byPropValue('prop', 'VALUE');

      const result = subject({
        prop: 'value',
      });

      expect(result).toBe(false);
    });

    it('should return false for no matching string prop value when caseInsensitive option is false', () => {
      const subject = byPropValue('prop', 'VALUE', {
        caseInsensitive: false,
      });

      const result = subject({
        prop: 'value',
      });

      expect(result).toBe(false);
    });

    it('should return false if an object prop value is undefined but the value passed is not undefined', () => {
      const subject = byPropValue('propA', 'not-undefined');

      const result = subject({
        propA: undefined,
      });

      expect(result).toBe(false);
    });

    it('should return true if an object prop value and value are undefined and the matchUndefined option is true', () => {
      const subject = byPropValue('propA', undefined, { matchUndefined: true });

      const result = subject({
        propA: undefined,
      });

      expect(result).toBe(true);
    });

    it('should return false if an object prop value and value are undefined and the matchUndefined option is false', () => {
      const subject = byPropValue('propA', undefined, {
        matchUndefined: false,
      });

      const result = subject({
        propA: undefined,
      });

      expect(result).toBe(false);
    });
  });

  describe('nested level values', () => {
    it('should return true for a second level matching prop value', () => {
      const subject = byPropValue('first.second', 'value');

      const result = subject({
        first: {
          second: 'value',
        },
      });

      expect(result).toBe(true);
    });

    it('should return true for a third level matching prop value', () => {
      const subject = byPropValue('first.second.third', 'value');

      const result = subject({
        first: {
          second: {
            third: 'value',
          },
        },
      });

      expect(result).toBe(true);
    });
  });

  describe('arrays', () => {
    it('should find an array element by matching prop value', () => {
      const array = [{ prop: 'a' }, { prop: 'b' }, { prop: 'c' }];

      const result = array.find(byPropValue('prop', 'b'));

      expect(result).toBe(array[1]);
    });

    it('should find an array element by matching nested prop value', () => {
      const array = [
        { first: { second: 'a' } },
        { first: { second: 'b' } },
        { first: { second: 'c' } },
      ];

      const result = array.find(byPropValue('first.second', 'b'));

      expect(result).toBe(array[1]);
    });
  });
});
