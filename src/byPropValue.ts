interface Options {
  caseInsensitive?: boolean;
  matchUndefined?: boolean;
}

type NestedObj<TObj> = Record<string, TObj[keyof TObj] | Record<string, TObj>>;
type NestedValue<TObj> = NestedObj<TObj>;

/**
 *
 * @param propName String name of the object property to look up.
 * @param value A value to match against obj[propName].
 *  typeof obj[propName] and typeof value must match.
 * @param insensitive For strings, whether matching is case-insensitive, default is false.
 * @returns A function that takes an object argument and returns a boolean as to if a match was found.
 */
const _byPropValue =
  <TObj>(
    propName: keyof TObj,
    value: TObj[keyof TObj],
    { caseInsensitive, matchUndefined }: Options = {
      caseInsensitive: false,
      matchUndefined: false,
    }
  ) =>
  (obj: TObj): boolean => {
    if (typeof obj === 'undefined') return false;

    const propValue = obj[propName];
    if (typeof propValue === 'undefined') {
      if (matchUndefined) {
        return typeof value === 'undefined';
      }
      return false;
    }

    if (typeof propValue !== typeof value) return false;

    const valuesAreStrings =
      typeof propValue === 'string' && typeof value === 'string';

    if (valuesAreStrings && caseInsensitive) {
      return propValue.toLocaleLowerCase() === value.toLowerCase();
    }

    return propValue === value;
  };

/**
 *
 * @param propName String name of the object property to look up.
 * @param value A value to match against obj[propName].
 *  typeof obj[propName] and typeof value must match.
 * @param insensitive For strings, whether matching is case-insensitive, default is false.
 * @returns A function that takes an object argument and returns a boolean as to if a match was found.
 */
export const byPropValue =
  <TObj extends Record<string, any>>(
    path: keyof NestedObj<TObj>,
    value: NestedValue<TObj> | any,
    options: Options = {
      caseInsensitive: false,
      matchUndefined: false,
    }
  ) =>
  (obj: TObj): boolean => {
    const [currentPath, ...remainingPath] = path.split('.');
    let predicate;

    if (remainingPath.length === 0) {
      predicate = _byPropValue(
        path as keyof TObj,
        value as TObj[keyof TObj],
        options
      ).bind(null, obj);
    } else {
      const nextLevelObj = obj[currentPath as keyof TObj];
      predicate = byPropValue(
        remainingPath.join('.'),
        value as typeof nextLevelObj[keyof typeof nextLevelObj],
        options
      ).bind(null, nextLevelObj);
    }

    return predicate();
  };
