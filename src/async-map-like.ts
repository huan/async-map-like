type AsyncifyIterable<R extends any> = R extends IterableIterator<infer I>
  ? AsyncIterableIterator<I>
  : R extends Map<infer K, infer V> ? Promise<AsyncMapLike<K, V>>
    : R extends boolean ? Promise<boolean>
    : Promise<R>

type AsyncifyFunction<T> = T extends (...args: any) => any
  ? (...args: Parameters<T>) => AsyncifyIterable<ReturnType<T>>
  : never

type Asyncify<T extends any> = T extends (...args: any) => any
  ? AsyncifyFunction<T>
  : Promise<T>

export type AsyncMapLike<K, V> = {
  [key in keyof Map<K, V>]: Asyncify<Map<K, V>[key]>
}
