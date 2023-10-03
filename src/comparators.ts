import { get } from './get';
import { NestedKeyOf } from './types';

type Comparator<T extends string | number | object> = (
  a: T,
  b: T
) => -1 | 0 | 1;

/**
 * Sort an array of objects by a property value, even if it's a value at a nested path.
 * arr = [
 *  { name: 'a', age: { nested: 'a' } },
 *  { name: 'b', age: { nested: 'a' } },
 * ]
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

    // nulls and undefineds should be sorted to the end of the array
    if (!aValue) {
      return 1;
    }
    if (!bValue) {
      return -1;
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
