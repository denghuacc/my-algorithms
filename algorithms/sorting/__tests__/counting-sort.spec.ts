import { countingSort } from '../counting-sort'
let array: Array<number>, sortedArr: Array<number>

describe('test countingSort', () => {
  beforeEach(() => {
    array = [1, 7, 5, 10, 3, 4, 5, 2]
    sortedArr = [1, 2, 3, 4, 5, 5, 7, 10]
  })

  test('countingSort', () => {
    expect(countingSort(array)).toEqual(sortedArr)
  })
})
