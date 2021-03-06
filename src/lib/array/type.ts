export type ArrayAndReadonlyArrayByPassArray<
  T extends any[] | readonly any[] = any[]
> = T | Readonly<T>

export type ArrayAndReadonlyArrayByPassItem<T = any> = T[] | readonly T[]

export type Tuple<T = any, R = T> = ArrayAndReadonlyArrayByPassArray<
  [T, ...R[]] | [...R[], T]
>

// Because of the depth limitation of generic instantiation of typescript, the use of generics is minimized when a large number of recursive operations may be involved.
// export type ArrayTuple<
//   N extends number,
//   V = any,
//   // array tool, don't pass in parameters
//   HelperArray extends V[] = []
// > =
//   N extends N
//     ? IfExtends<
//         [IsEqual<HelperArray['length'], N>, true],
//         HelperArray,
//         ArrayTuple<N, V, [...HelperArray, V]>
//       >
//     : never

// notice: distributed condition type
export type ArrayTuple<
  N extends number,
  V = any,
  // array tool, don't pass in parameters
  HelperArray extends V[] = []
> = N extends N
  ? HelperArray['length'] extends N
    ? HelperArray
    : ArrayTuple<N, V, [...HelperArray, V]>
  : never

// notice: distributed condition type
export type IsTuple<T extends ArrayAndReadonlyArrayByPassArray> =
  T extends Tuple ? true : false

// notice: distributed condition type
export type ArrayItem<T extends ArrayAndReadonlyArrayByPassItem> =
  T extends ArrayAndReadonlyArrayByPassItem<infer Item> ? Item : never

// notice: distributed condition type
export type FlattedArrayItem<T extends ArrayAndReadonlyArrayByPassItem> =
  T extends ArrayAndReadonlyArrayByPassItem<infer Item>
    ? Item extends ArrayAndReadonlyArrayByPassItem
      ? FlattedArrayItem<Item>
      : Item
    : never

// notice: distributed condition type
export type IsEmptyTypeArray<T extends ArrayAndReadonlyArrayByPassArray> =
  T extends T ? (T['length'] extends 0 ? true : false) : never

// notice: distributed condition type
export type IsReadonlyArray<T extends ArrayAndReadonlyArrayByPassArray> =
  T extends any[] ? false : true
