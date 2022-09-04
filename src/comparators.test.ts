import { byPropAtoZ } from './comparators';

describe('comparators', () => {
  it('should compare two numbers', () => {
    const array = [{ name: 'bravo' }, { name: 'alpha' }];

    const result = array.sort(byPropAtoZ('name'));

    expect(result).toEqual([{ name: 'alpha' }, { name: 'bravo' }]);
  });
});
