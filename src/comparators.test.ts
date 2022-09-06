import { byPropAtoZ } from './comparators';

describe('comparators', () => {
  it('should compare objects by name value', () => {
    const array = [{ name: 'bravo' }, { name: 'alpha' }];

    const subject = byPropAtoZ('name');
    const result = array.sort(subject);
    // const result = array.sort(byPropAtoZ('name'));

    expect(result).toEqual([{ name: 'alpha' }, { name: 'bravo' }]);
  });

  it('should compare objects by nested name value', () => {
    const array = [
      { nested: { name: 'bravo' } },
      { nested: { name: 'alpha' } },
    ];

    const result = array.sort(byPropAtoZ('nested.name'));

    expect(result).toEqual([
      { nested: { name: 'alpha' } },
      { nested: { name: 'bravo' } },
    ]);
  });
});
