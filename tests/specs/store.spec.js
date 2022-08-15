import { setActivePinia, createPinia } from 'pinia'
import { test, expect, describe, beforeEach } from 'vitest'
import { useStore } from '@store/testStore/index.ts'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  test('doubleCounter', () => {
    const store = useStore()
    expect(store.doubleCounter).toBe(2)
    expect(store.doubleCounterPlusOne).toBe(3)
    expect(store.doubleCounterBelongParams(10)).toBe(11)
    expect(store.doubleCounterBelongParamsActions()).toBe(101)
  })
})