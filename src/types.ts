export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

export type NestedKeyOf<ObjectType> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & string];

type Primitive = number | boolean | string | null | undefined | Primitive[];

export type ObjectType = {
  [key: string]: Primitive | ObjectType | ObjectType[];
};
