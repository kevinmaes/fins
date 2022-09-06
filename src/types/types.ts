export type NestedObj<TObj> = Record<
  string,
  TObj[keyof TObj] | Record<string, TObj>
>;
export type NestedValue<TObj> = NestedObj<TObj>;
