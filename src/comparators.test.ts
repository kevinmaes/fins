import { byPropAtoZ } from './comparators';

describe.only('comparators', () => {
  it('should sort null values to the start of the array', () => {
    const array = [
      { name: 'alpha' },
      { name: undefined },
      { name: 'beta' },
      { name: undefined },
      { name: 'gamma' },
    ];
    const subject = byPropAtoZ('name');

    const result = array.sort(subject);

    expect(result).toEqual([
      { name: 'alpha' },
      { name: 'beta' },
      { name: 'gamma' },
      { name: undefined },
      { name: undefined },
    ]);
  });

  it('should sort null values to the start of the array', () => {
    const array = [
      { name: 'alpha' },
      { name: null },
      { name: 'beta' },
      { name: null },
      { name: 'gamma' },
    ];
    const subject = byPropAtoZ('name');

    const result = array.sort(subject);

    expect(result).toEqual([
      { name: 'alpha' },
      { name: 'beta' },
      { name: 'gamma' },
      { name: null },
      { name: null },
    ]);
  });

  it('should compare objects by name value', () => {
    const array = [{ name: 'bravo' }, { name: 'alpha' }];
    const subject = byPropAtoZ('name');

    const result = array.sort(subject);

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
