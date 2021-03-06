export type AnyType = string | number | boolean | symbol | object | null | undefined
export type ConstructorOf<T> = new (...args: any[]) => T
export type ArrayItemType<T> = T extends (infer U)[] ? U : never

export type IsAny<T, TrueType = true, FalseType = false> = 1 extends (T extends never ? 1 : 0) ? TrueType : FalseType
export type IsInvariant<T, U, TrueType = true, FalseType = false> = [T] extends [U] ? ([U] extends [T] ? TrueType : FalseType) : FalseType
export type IsNever<T, TrueType = true, FalseType = false> = [T] extends [never] ? TrueType : FalseType

export type IsInvariantWithoutAny<T, U, TrueType = true, FalseType = false> = IsAny<T, FalseType, IsAny<U, FalseType, IsInvariant<T, U, TrueType, FalseType>>>
export type IsUndefinedOrNever<T, TrueType = true, FalseType = false> = IsInvariant<T, undefined, TrueType, IsNever<T, TrueType, FalseType>>
export type IsTrue<T extends boolean, TrueType = true, FalseType = false> = IsInvariantWithoutAny<T, true, TrueType, FalseType>

export type FilterUndefinedKeys<T extends object> = { [Key in keyof T]: undefined extends T[Key] ? Key : never }[keyof T]
export type OmitUndefinedKeys<T extends object> = { [Key in keyof T]: undefined extends T[Key] ? never : Key }[keyof T]
export type MakeOptional<T extends object> = Exclude<({ [Key in OmitUndefinedKeys<T>]: T[Key] } & { [Key in FilterUndefinedKeys<T>]?: T[Key] }) | undefined, undefined>
