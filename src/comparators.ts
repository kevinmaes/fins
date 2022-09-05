type NestedObj<TObj> = Record<string, TObj[keyof TObj] | Record<string, TObj>>;
type NestedValue<TObj> = NestedObj<TObj>;

type Comparator<TElement extends string | number | object> = (
  a: TElement,
  b: TElement
) => -1 | 0 | 1;

type PropComparatorFactory = <TObj extends object>(
  path: keyof TObj
) => Comparator<TObj>;

const _byPropAtoZ =
  <TObj extends object>(path: keyof TObj): Comparator<TObj> =>
  (a, b) => {
    if (a[path] < b[path]) {
      return -1;
    }
    if (a[path] > b[path]) {
      return 1;
    }
    return 0;
  };

// const byPropAtoZ = <TObj extends object>(
//   path: keyof NestedObj<TObj>
// ): Comparator<TObj> => {
//   const [currentPath, ...remainingPath] = path.split('.');
//   let comparator;

//   if (remainingPath.length === 0) {
//     comparator = _byPropAtoZ(currentPath);
//   } else {
//     const nextLevelAObj = a[currentPath as keyof TObj];
//     const nextLevelBObj = b[currentPath as keyof TObj];
//     comparator = byPropAtoZ(remainingPath.join('.'));
//     // predicate = byPropAtoZ(remainingPath.join('.')).bind(
//     //   null,
//     //   nextLevelAObj,
//     //   nextLevelBObj
//     // );
//   }

//   return (a, b) => {
//     // let predicate;
//     // if (remainingPath.length === 0) {
//     //   predicate = _byPropAtoZ(currentPath).bind(null, a, b);
//     // } else {
//     //   const nextLevelAObj = a[currentPath as keyof TObj];
//     //   const nextLevelBObj = b[currentPath as keyof TObj];
//     //   predicate = byPropAtoZ(remainingPath.join('.')).bind(
//     //     null,
//     //     nextLevelAObj,
//     //     nextLevelBObj
//     //   );
//     // }
//     // return predicate();
//   };
// };

const byPropAtoZ =
  <TObj extends object>(path: keyof NestedObj<TObj>) =>
  (a: any, b: any) => {
    const [currentPath, ...remainingPath] = path.split('.');

    if (remainingPath.length === 0) {
      const predicate = _byPropAtoZ(currentPath);
      return predicate(a, b);
    } else {
      const nextLevelAObj = a[currentPath as keyof TObj];
      const nextLevelBObj = b[currentPath as keyof TObj];
      const predicate = byPropAtoZ(remainingPath.join('.'));
      return predicate(nextLevelAObj, nextLevelBObj);
    }
  };
