type AsyncifyIterable<R extends any> = R extends IterableIterator<infer I>
  ? AsyncIterableIterator<I>
  : R extends Map<infer K, infer V> ? Promise<AsyncMapLike<K, V>>
    : R extends boolean ? Promise<boolean>
    : Promise<R>

type AsyncifyFunction<R extends any> = R extends (...args: any) => any
  ? (...args: Parameters<R>) => AsyncifyIterable<ReturnType<R>>
  : Promise<R>

export type AsyncMapLike<K, V> = {
  [key in keyof Map<K, V>]: AsyncifyFunction<Map<K, V>[key]>
}
