type Comparator<TElement extends string | number | object> = (
  a: TElement,
  b: TElement
) => -1 | 0 | 1;

type PropComparatorFactory = <TObj extends object>(
  propName: keyof TObj
) => Comparator<TObj>;

export const byPropAtoZ: PropComparatorFactory = (propName) => (a, b) => {
  if (a[propName] < b[propName]) {
    return -1;
  }
  if (a[propName] > b[propName]) {
    return 1;
  }
  return 0;
};
