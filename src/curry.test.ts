import { curry } from './curry';
import { filterMap } from './filterMap';

describe('curry', () => {
  it('should curry a function until all of its arguments have been provided', () => {
    const fn = (arg1: number, arg2: number, arg3: number) => arg1 + arg2 + arg3;

    const subject = curry(fn);
    const plus1 = subject(1);
    const plus2 = plus1(2);
    const plus3 = plus2(3);

    expect(plus3).toEqual(6);
  });

  it('should curry multiple functions without conflict', () => {
    const fn = (arg1: number, arg2: number) => arg1 + arg2;

    const subject1 = curry(fn);
    const result1 = subject1(1)(2);
    const subject2 = curry(fn);
    const result2 = subject2(2)(3);

    expect(result1).toEqual(3);
    expect(result2).toEqual(5);
  });
});
