const { insertionSort, insertionSort2 } = require('../insertion-sort')
let array, sortedArr

describe('test insertionSort', () => {
  beforeEach(() => {
    array = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('insertionSort', () => {
    expect(insertionSort(array)).toEqual(sortedArr)
  })

  test('insertionSort2', () => {
    expect(insertionSort2(array)).toEqual(sortedArr)
  })
})
