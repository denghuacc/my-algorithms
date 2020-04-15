import { sequentialSearch } from '../sequential-search'
let array: Array<unknown>

describe('test sequentialSearch', () => {
  beforeEach(() => {
    array = ['a', 1, 3, 'c']
  })

  test('sequentialSearch', () => {
    let target: unknown = 'a'
    expect(sequentialSearch(array, target)).toBe(0)
    target = 3
    expect(sequentialSearch(array, target)).toBe(2)
    target = 'b'
    expect(sequentialSearch(array, target)).toBe(-1)
  })
})
