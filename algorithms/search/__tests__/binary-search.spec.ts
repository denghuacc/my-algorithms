import { binarySearch } from '../binary-search'
let array: Array<number>

describe('test binarySearch', () => {
  beforeEach(() => {
    array = [1, 3, 5, 11, 13, 15, 22, 33]
  })

  test('binarySearch', () => {
    let target = 13
    expect(binarySearch(array, target)).toBe(4)
    target = 22
    expect(binarySearch(array, target)).toBe(6)
    target = 24
    expect(binarySearch(array, target)).toBe(-1)
  })
})
