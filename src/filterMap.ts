import { curry } from './curry';

// A function that simultanously filters and maps over an array,
// in a single iteration.
export const filterMap = <TElement, TMappedElement>(
  filter: (arg: TElement) => boolean,
  map: (arg: TElement) => TMappedElement,
  array: TElement[]
) => {
  const result = array.reduce((acc: TMappedElement[], next) => {
    if (filter(next)) {
      acc.push(map(next));
    }

    return acc;
  }, []);

  return result;
};

// export const filterMap = curry(
//   <TElement, TMappedElement>(
//     filter: (arg: TElement) => boolean,
//     map: (arg: TElement) => TMappedElement,
//     array: TElement[]
//   ) =>
//     array.reduce((acc: TMappedElement[], next) => {
//       if (filter(next)) {
//         acc.push(map(next));
//       }

//       return acc;
//     }, [])
// );
