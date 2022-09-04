import { byPropValue } from './byPropValue';

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
export const byDeepPropValue =
  <TObj extends Record<string, any>>(
    path: keyof NestedObj<TObj>,
    value: NestedValue<TObj> | any,
    options: Options = {
      caseInsensitive: false,
      matchUndefined: false,
    }
  ) =>
  (obj: TObj): boolean => {
    const pathArray = path.split('.');
    const thisPathFragment = pathArray.shift();

    if (pathArray.length === 0) {
      const predicate = byPropValue(
        path as keyof TObj,
        value as TObj[keyof TObj],
        options
      );
      const result = predicate(obj);
      return result;
    } else {
      const nextLevelObj = obj[thisPathFragment as keyof TObj];
      const predicate = byDeepPropValue(
        pathArray.join('.'),
        value as typeof nextLevelObj[keyof typeof nextLevelObj],
        options
      );
      const result = predicate(nextLevelObj);
      return result;
    }

    return false;
  };
