const { mergeSort } = require('../mergeSort')
let arr, sortedArr

describe('test mergeSort', () => {
  beforeEach(() => {
    arr = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('mergeSort', () => {
    expect(mergeSort(arr)).toEqual(sortedArr)
  })
})
