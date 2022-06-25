import { filterMap } from './';

describe('filterMap', () => {
  it('should filter and map an array', () => {
    const isEven = (num: number) => num % 2 === 0;
    const double = (num: number) => num * 2;
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const result = filterMap(isEven, double, array);

    expect(result).toEqual([0, 4, 8, 12, 16]);
  });

  // it.skip('should filter and map an array, curried', () => {
  //   const isEven = (num: number) => num % 2 === 0;
  //   const double = (num: number) => num * 2;
  //   const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  //   // const subject = filterMap(isEven, double);
  //   // const result = filterMap(isEven)(double)(array);
  //   // const curriedFilterMap = curry(filterMap);
  //   // const result = curriedFilterMap(isEven, double, array);
  //   // const result = curriedFilterMap(isEven, double)(array);
  //   // const result = curriedFilterMap(isEven)(double)(array);
  //   // const result = filterMap(isEven, double, array);
  //   // const result = filterMap(isEven)(double)(array);

  //   // const result = subject(isEven, double)(array);
  //   // console.log('type', typeof subject, subject);
  //   // const subject2 = filterMap(double);
  //   // const result = subject(array);

  //   // expect(result).toEqual([0, 4, 8, 12, 16]);
  // });
});
