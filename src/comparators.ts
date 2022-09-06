import { NestedObj } from './types/types';
import { _get } from './_internal/_get';

type Comparator<TElement extends string | number | object> = (
  a: TElement,
  b: TElement
) => -1 | 0 | 1;

type PropComparatorFactory = <TObj extends Record<string, any>>(
  path: keyof NestedObj<TObj>
) => Comparator<TObj>;

export const byPropAtoZ: PropComparatorFactory = (path) => (a, b) => {
  const aValue = _get(path, a);
  const bValue = _get(path, b);

  if (aValue < bValue) {
    return -1;
  }
  if (aValue > bValue) {
    return 1;
  }
  return 0;
};
