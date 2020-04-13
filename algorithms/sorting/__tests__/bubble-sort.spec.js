const { bubbleSort, bubbleSort2, bubbleSort3 } = require('../bubble-sort')
let array, sortedArr

describe('test bubbleSort', () => {
  beforeEach(() => {
    array = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('bubbleSort', () => {
    expect(bubbleSort(array)).toEqual(sortedArr)
  })

  test('bubbleSort2', () => {
    expect(bubbleSort2(array)).toEqual(sortedArr)
  })

  test('bubbleSort3', () => {
    expect(bubbleSort3(array)).toEqual(sortedArr)
  })
})
