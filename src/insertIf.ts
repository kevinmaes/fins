/**
 * Conditionally insert one or more elements into an array.
 * @param elements A single element or an array of elements to be inserted if the condition is met
 * @param condition A predicate arg or boolean condition determining whether
 *  or not to add element(s)
 * @returns An array containing the single element passed as the first arg
 *  or an array containing multiple elements passed as the first arg.
 *
 *  Note: Since this function returns an array it must be spread into
 *  the target array.
 *
 * @example
 *  const array = [0, ...insertIf(1, true), 2]; // => [0, 1, 2]
 *  // Doing the following without `...` will insert a nested array.
 *  const array = [0, insertIf(1, true), 2]; // => [0, [1], 2]
 *
 */
export function insertIf<TElement extends any>(
  elements: TElement | TElement[],
  condition: boolean //| (...args: any[]) => boolean
): TElement[] {
  if (typeof condition === 'boolean' && condition) {
    return Array.isArray(elements) ? elements : [elements];
  }
  return [];
}
