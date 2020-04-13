const { insertionSort, insertionSort2 } = require('../insertionSort')
let arr, sortedArr

describe('test insertionSort', () => {
  beforeEach(() => {
    arr = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('insertionSort', () => {
    expect(insertionSort(arr)).toEqual(sortedArr)
  })

  test('insertionSort2', () => {
    expect(insertionSort2(arr)).toEqual(sortedArr)
  })
})
