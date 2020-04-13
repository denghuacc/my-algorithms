const { bucketSort } = require('../bucket-sort')
let array, sortedArr

describe('test bucketSort', () => {
  beforeEach(() => {
    array = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('bucketSort', () => {
    expect(bucketSort(array)).toEqual(sortedArr)
  })
})
