const { shellSort } = require('../shellSort')
let arr, sortedArr

describe('test shellSort', () => {
  beforeEach(() => {
    arr = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('shellSort', () => {
    expect(shellSort(arr)).toEqual(sortedArr)
  })
})
