import { byPropValue } from './byPropValue';

interface Options {
  caseInsensitive?: boolean;
  matchUndefined?: boolean;
}

/**
 *
 * @param propName String name of the object property to look up.
 * @param value A value to match against obj[propName].
 *  typeof obj[propName] and typeof value must match.
 * @param insensitive For strings, whether matching is case-insensitive, default is false.
 * @returns A function that takes an object argument and returns a boolean as to if a match was found.
 */

export const byDeepPropValue =
  <TObj>(
    // path: string extends keyof TObj ? string : never,
    path: string extends keyof TObj ? keyof Element : string,
    value: TObj[keyof TObj],
    // value:
    //   | TObj[keyof TObj]
    //   | TObj[keyof TObj][keyof TObj[keyof TObj]],
    { caseInsensitive, matchUndefined }: Options = {
      caseInsensitive: false,
      matchUndefined: false,
    }
  ) =>
  (obj: TObj): boolean => {
    const pathArray = path.split('.');
    const pathArrayLength = pathArray.length;

    if (path in obj) {
      const predicate = byPropValue(path as keyof TObj, value, {
        caseInsensitive,
        matchUndefined,
      });
      const result = predicate(obj);
      return result;
    } else {
      const nextLevelObj = obj[pathArray[0] as keyof TObj];
      const predicate = byPropValue<typeof nextLevelObj>(
        pathArray[1] as keyof typeof nextLevelObj,
        // pathArray[1],
        value,
        {
          caseInsensitive,
          matchUndefined,
        }
      );
      const result = predicate(nextLevelObj);
      return result;
    }

    return false;

    // if (typeof obj === 'undefined') return false;

    // const propValue = obj[propName];
    // if (typeof propValue === 'undefined') {
    //   if (matchUndefined) {
    //     return typeof value === 'undefined';
    //   }
    //   return false;
    // }

    // if (typeof propValue !== typeof value) return false;

    // const valuesAreStrings =
    //   typeof propValue === 'string' && typeof value === 'string';

    // if (valuesAreStrings && caseInsensitive) {
    //   return propValue.toLocaleLowerCase() === value.toLowerCase();
    // }

    // return propValue === value;
  };
