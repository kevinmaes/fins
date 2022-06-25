// import curry from 'lodash/curry';

import { curry } from './curry';

// import type { InsertIf } from './types';

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
export const byPropValue =
  <T>(
    propName: keyof T,
    value: T[keyof T],
    { caseInsensitive, matchUndefined }: Options = {
      caseInsensitive: false,
      matchUndefined: false,
    }
  ) =>
  (obj: T): boolean => {
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
