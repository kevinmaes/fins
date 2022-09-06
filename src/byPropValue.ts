interface Options {
  caseInsensitive?: boolean;
  matchUndefined?: boolean;
}

type NestedObj<TObj> = Record<string, TObj[keyof TObj] | Record<string, TObj>>;
type NestedValue<TObj> = NestedObj<TObj>;

const _get = <TObj>(
  path: keyof NestedObj<TObj>,
  obj: TObj
): NestedValue<TObj> | any => {
  const [currentPath, ...remainingPath] = path.split('.');
  if (remainingPath.length === 0) {
    if (currentPath in obj) {
      return obj[currentPath as keyof TObj];
    }
    return undefined;
  }
  return _get(remainingPath.join('.'), obj[currentPath as keyof TObj]);
};

/**
 *
 * @param propName String name of the object property to look up.
 * @param targetValue A targetValue to match against obj[propName].
 *  typeof obj[propName] and typeof targetValue must match.
 * @param insensitive For strings, whether matching is case-insensitive, default is false.
 * @returns A function that takes an object argument and returns a boolean as to if a match was found.
 */
export const byPropValue =
  <TObj extends Record<string, any>>(
    path: keyof NestedObj<TObj>,
    targetValue: NestedValue<TObj> | any,
    { matchUndefined, caseInsensitive }: Options = {
      caseInsensitive: false,
      matchUndefined: false,
    }
  ) =>
  (obj: TObj): boolean => {
    if (typeof obj === 'undefined') return false;

    const propValue = _get(path, obj);
    if (typeof propValue === 'undefined') {
      if (matchUndefined) {
        return typeof targetValue === 'undefined';
      }
      return false;
    }

    if (typeof propValue !== typeof targetValue) return false;

    const valuesAreStrings =
      typeof propValue === 'string' && typeof targetValue === 'string';

    if (valuesAreStrings && caseInsensitive) {
      return propValue.toLocaleLowerCase() === targetValue.toLowerCase();
    }

    return propValue === targetValue;
  };
