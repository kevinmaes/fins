import { filterMap } from './filterMap';

describe('filterMap', () => {
  it('should filter and map an array', () => {
    const isEven = (num: number) => num % 2 === 0;
    const double = (num: number) => num * 2;
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = filterMap(isEven, double, array);

    expect(result).toEqual([0, 4, 8, 12, 16]);
  });
});
