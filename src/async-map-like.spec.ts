#!/usr/bin/env ts-node

import { test }  from 'tstest'

import { AsyncMapLike } from './async-map-like'

test('AsyncMapLike Interface', async (t) => {
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
