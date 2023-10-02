export type NestedKeyOf<ObjectType> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & string];

// obj = { prop1: 'value1' };
// path = 'prop1';
// => 'value1'
//
// obj = { prop1: { nestedProp1: 'nestedValue1' } };
// path = 'prop1.nestedProp1';
// => 'nestedValue1'
//
type Primitive = number | boolean | string | null | undefined;

export type StringThing = { [key: string]: StringThing | Primitive };

export function _get<T extends StringThing>(obj: T, path: NestedKeyOf<T>) {
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
    return _get(nextObj, pathParts.slice(1).join('.'));
  }
}
