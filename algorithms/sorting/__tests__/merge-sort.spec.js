const { mergeSort } = require('../merge-sort')
let array, sortedArr

describe('test mergeSort', () => {
  beforeEach(() => {
    array = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('mergeSort', () => {
    expect(mergeSort(array)).toEqual(sortedArr)
  })
})
