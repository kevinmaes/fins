import { get } from './get';
import { NestedKeyOf, ObjectType } from './types';

interface Options {
  caseInsensitive?: boolean;
  matchUndefined?: boolean;
}

/**
 *
 * @param propName String name of the object property to look up.
 * @param targetValue A targetValue to match against obj[propName].
 *  typeof obj[propName] and typeof targetValue must match.
 * @param insensitive For strings, whether matching is case-insensitive, default is false.
 * @returns A function that takes an object argument and returns a boolean as to if a match was found.
 */
export function byPropValue<T extends ObjectType>(
  path: NestedKeyOf<T>,
  targetValue: T[keyof T & string],
  { matchUndefined, caseInsensitive }: Options = {
    caseInsensitive: false,
    matchUndefined: false,
  }
) {
  return (obj: ObjectType): boolean => {
    if (typeof obj === 'undefined') return false;

    const propValue = get(obj, path);
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
}
