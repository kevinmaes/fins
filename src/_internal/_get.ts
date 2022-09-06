import { NestedObj, NestedValue } from '../types/types';

export const _get = <TObj>(
  path: keyof NestedObj<TObj>,
  obj: TObj
): NestedValue<TObj> | any => {
  const [currentPath, ...remainingPath] = path.split('.');
  if (remainingPath.length === 0) {
    if (currentPath in obj) {
      return obj[currentPath as keyof TObj];
    }
    return undefined;
  }
  return _get(remainingPath.join('.'), obj[currentPath as keyof TObj]);
};
