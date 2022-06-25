import { curry } from './curry';

// A function that simultanously filters and maps over an array,
// in a single iteration.
export const filterMap = <Element, MappedElement>(
  filter: (arg: Element) => boolean,
  map: (arg: Element) => MappedElement,
  array: Element[]
) => {
  const result = array.reduce((acc: MappedElement[], next) => {
    if (filter(next)) {
      acc.push(map(next));
    }

    return acc;
  }, []);

  return result;
};

// export const filterMap = curry(
//   <Element, MappedElement>(
//     filter: (arg: Element) => boolean,
//     map: (arg: Element) => MappedElement,
//     array: Element[]
//   ) =>
//     array.reduce((acc: MappedElement[], next) => {
//       if (filter(next)) {
//         acc.push(map(next));
//       }

//       return acc;
//     }, [])
// );
