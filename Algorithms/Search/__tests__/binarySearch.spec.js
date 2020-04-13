const { binarySearch } = require('../binarySearch')
let arr

describe('test binarySearch', () => {
  beforeEach(() => {
    arr = [1, 3, 5, 11, 13, 15, 22, 33]
  })

  test('binarySearch', () => {
    let target = 13
    expect(binarySearch(arr, target)).toBe(4)
    target = 22
    expect(binarySearch(arr, target)).toBe(6)
    target = 24
    expect(binarySearch(arr, target)).toBe(-1)
  })
})
