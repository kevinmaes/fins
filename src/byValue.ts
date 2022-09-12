import { NestedObj, NestedValue } from './types/types';
import { _get } from './_internal/_get';

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
export const byValue =
  <TVal extends any>(
    targetValue: TVal,
    { matchUndefined, caseInsensitive }: Options = {
      caseInsensitive: false,
      matchUndefined: false,
    }
  ) =>
  (val: TVal): boolean => {
    if (typeof val === 'undefined') return false;

    if (typeof val === 'undefined') {
      if (matchUndefined) {
        return typeof val === 'undefined';
      }
      return false;
    }

    if (typeof val !== typeof targetValue) return false;

    const valuesAreStrings =
      typeof val === 'string' && typeof targetValue === 'string';

    if (valuesAreStrings && caseInsensitive) {
      return val.toLocaleLowerCase() === targetValue.toLowerCase();
    }

    return val === targetValue;
  };
