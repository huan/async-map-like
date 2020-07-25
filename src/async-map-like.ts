type AsyncifyIterable<K, V, R extends any> = R extends IterableIterator<[K, V]>
  ? AsyncIterableIterator<[K, V]>
  : R extends boolean
    ? Promise<boolean>
    : Promise<R>

type AsyncifyFunction<K, V, R extends any> = R extends (...args: any) => any
  ? (...args: Parameters<R>) => AsyncifyIterable<K, V, ReturnType<R>>
  : Promise<R>

export type AsyncMapLike<K, V> = {
  [key in keyof Map<K, V>]: AsyncifyFunction<K, V, Map<K, V>[key]>
}
