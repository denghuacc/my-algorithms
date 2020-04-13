const { radixSort } = require('../radix-sort')
let array, sortedArr

describe('test radixSort', () => {
  beforeEach(() => {
    array = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('radixSort', () => {
    expect(radixSort(array)).toEqual(sortedArr)
  })
})
