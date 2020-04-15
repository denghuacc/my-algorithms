import { shellSort } from '../shell-sort'
let array: Array<number>, sortedArr: Array<number>

describe('test shellSort', () => {
  beforeEach(() => {
    array = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('shellSort', () => {
    expect(shellSort(array)).toEqual(sortedArr)
  })
})
