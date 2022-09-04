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
  <ElementObj>(
    propName: keyof ElementObj,
    value: ElementObj[keyof ElementObj],
    { caseInsensitive, matchUndefined }: Options = {
      caseInsensitive: false,
      matchUndefined: false,
    }
  ) =>
  (obj: ElementObj): boolean => {
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
