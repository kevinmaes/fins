import { NestedKeyOf, get } from './get';
// import { NestedObj } from './byPropValue';

type Comparator<TElement extends string | number | object> = (
  a: TElement,
  b: TElement
) => -1 | 0 | 1;

/**
 * arr = [
 *  { name: 'a', age: { nested: 'a' } },
 *  { name: 'b', age: { nested: 'a' } },
 * ]
 *
 *
 * arr.sort(byPropAtoZ('name'))
 * arr.sort(byPropAtoZ('age.nested'))
 *
 * @param path
 * @returns
 */

export function byPropAtoZ<TObj extends Record<string, any>>(
  path: NestedKeyOf<TObj>
): Comparator<TObj> {
  return (a, b) => {
    const aValue = get(a, path);
    const bValue = get(b, path);

    if (!aValue) {
      return -1;
    }
    if (!bValue) {
      return 1;
    }

    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }
    return 0;
  };
}
