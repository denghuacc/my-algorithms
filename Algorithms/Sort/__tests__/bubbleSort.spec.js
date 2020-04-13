const { bubbleSort, bubbleSort2, bubbleSort3 } = require('../bubbleSort')
let arr, sortedArr

describe('test bubbleSort', () => {
  beforeEach(() => {
    arr = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('bubbleSort', () => {
    expect(bubbleSort(arr)).toEqual(sortedArr)
  })

  test('bubbleSort2', () => {
    expect(bubbleSort2(arr)).toEqual(sortedArr)
  })

  test('bubbleSort3', () => {
    expect(bubbleSort3(arr)).toEqual(sortedArr)
  })
})
