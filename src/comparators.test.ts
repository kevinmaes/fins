import { byPropAtoZ } from './comparators';

describe('comparators', () => {
  it('should compare objects by name value', () => {
    const array = [{ name: 'bravo' }, { name: 'alpha' }];

    const result = array.sort(byPropAtoZ('name'));

    expect(result).toEqual([{ name: 'alpha' }, { name: 'bravo' }]);
  });
});
