#!/usr/bin/env ts-node

import { test }  from 'tstest'

import { AsyncMapLike } from './async-map-like'

test('AsyncMapLike Interface via object', async (t) => {
  const mapCollection = {
    clear: async (): Promise<void> => {},
    delete: async (key: any): Promise<boolean> => { return !!key },
    forEach: async (
      callbackfn: (
        value: any,
        key: any,
        map: Map<any, any>
      ) => void,
      thisArg?: any,
    ): Promise<void> => { void callbackfn; void thisArg },
    get: async (_: any): Promise<any> => {},
    has: async (key: any): Promise<boolean> => !!key,
    set: async function (_: any, __: any): Promise<any> { return ({} as any) },
    size: Promise.resolve(42),
  }

  const mapIterable = {
    [Symbol.iterator]: (): AsyncIterableIterator<[any, any]> => { return {} as any },
    entries: (): AsyncIterableIterator<[any, any]> => { return {} as any },
    keys: (): AsyncIterableIterator<any> => { return {} as any },
    values: (): AsyncIterableIterator<any> => { return {} as any },
  }

  const mapLike: AsyncMapLike<any, any> = {
    ...mapCollection,
    ...mapIterable,
  }

  t.ok(mapLike, 'should be assign-able from ES6 Map to our MapLike')
})

test('AsyncMapLike Interface via class', async (t) => {
  class TestAsyncMapLike implements AsyncMapLike<string, number> {

    constructor () {}

    /**
     * Collection
     */
    async clear (): Promise<void> {}
    async delete (key: string): Promise<boolean> { return !!key }
    async forEach (
      callbackfn: (
        value: number,
        key: string,
        // map: TestAsyncMapLike,
        // FIXME(huan) 202007: we have to use any at here, because the typing system is very hard to
        //  rename `Map` to `TestAsyncMapLike` in this method function parameters.
        map: any,
      ) => void,
      thisArg?: any,
    ): Promise<void> { void callbackfn; void thisArg }

    async get (key: string): Promise<number> { void key; return 42 }
    async has (key: string): Promise<boolean> { return !!key }
    async set (key: string, value: number): Promise<this> { void key; void value; return this }
    get size () { return Promise.resolve(42) }

    /**
     * Interable
     */
    [Symbol.iterator] (): AsyncIterableIterator<[string, number]> { return {} as any }
    entries (): AsyncIterableIterator<[string, number]> { return {} as any }
    keys (): AsyncIterableIterator<string> { return {} as any }
    values (): AsyncIterableIterator<number> { return {} as any }

    get [Symbol.toStringTag] () { return 'test' }

  }

  const mapLike = new TestAsyncMapLike()
  t.ok(mapLike, 'should be implement-able from AsyncMapLike')
})
