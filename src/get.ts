import { NestedKeyOf, ObjectType } from './types';

/**
 *
 * @example
 * obj = { prop1: 'value1' };
 * path = 'prop1';
 * => 'value1'
 *
 * @example
 * obj = { prop1: { nestedProp1: 'nestedValue1' } };
 * path = 'prop1.nestedProp1';
 * => 'nestedValue1'
 *
 * @param obj
 * @param path
 * @returns
 */
export function get<T extends ObjectType>(obj: T, path: NestedKeyOf<T>) {
  const pathParts = path.split('.');
  const firstPart = pathParts[0];

  if (!firstPart) {
    return undefined;
  }

  if (pathParts.length === 1) {
    return obj[firstPart];
  }

  const nextObj = obj[pathParts[0]];
  if (nextObj && typeof nextObj === 'object' && !Array.isArray(nextObj)) {
    return get(nextObj, pathParts.slice(1).join('.'));
  }
}
