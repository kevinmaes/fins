// A function that simultanously filters and maps over an array,
// in a single iteration.
// eslint-disable-next-line import/no-unused-modules
export const filterMap = <Element, MappedElement>(
  filter: (arg: Element) => boolean,
  map: (arg: Element) => MappedElement,
  array: Element[]
) =>
  array.reduce((acc: MappedElement[], next) => {
    if (filter(next)) {
      acc.push(map(next));
    }

    return acc;
  }, []);
