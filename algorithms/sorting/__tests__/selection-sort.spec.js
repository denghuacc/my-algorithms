const { selectionSort } = require('../selection-sort')
let array, sortedArr

describe('test selectionSort', () => {
  beforeEach(() => {
    array = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('selectionSort', () => {
    expect(selectionSort(array)).toEqual(sortedArr)
  })
})
