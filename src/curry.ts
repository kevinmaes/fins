import { ArgumentTypes } from './types';

/**
 * Creates a function that accepts arguments of fn and either invokes
 * fn returning its result, if at least arity number of arguments have
 * been provided, or returns a function that accepts the remaining
 * fn arguments, and so on.
 * @param {Function} fn
 * @returns {Function}
 */
export function curry<T extends Function>(fn: T) {
  const argsReceived: any[] = [];
  function partial(...args: ArgumentTypes<T>[number][]) {
    return argsReceived.push(...args) >= fn.length
      ? fn(...argsReceived.slice(0, fn.length))
      : partial;
  }
  return partial;
}
