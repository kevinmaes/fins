type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

/**
 * Creates a function that accepts arguments of fn and either invokes
 * fn returning its result, if at least arity number of arguments have
 * been provided, or returns a function that accepts the remaining
 * fn arguments, and so on.
 * @param {Function} fn
 * @returns {Function}
 */
export const curry = <Func extends Function>(fn: Func) => {
  const argsReceived: any[] = [];
  const partial = (...args: any[]) =>
    argsReceived.push(...args) >= fn.length ? fn(...argsReceived) : partial;
  return partial;
};