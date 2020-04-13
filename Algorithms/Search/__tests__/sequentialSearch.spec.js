const { sequentialSearch } = require('../sequentialSearch')

describe('test sequentialSearch', () => {
  beforeEach(() => {
    arr = ['a', 1, 3, 'c']
  })

  test('binarySearch', () => {
    let target = 'a'
    expect(sequentialSearch(arr, target)).toBe(0)
    target = 3
    expect(sequentialSearch(arr, target)).toBe(2)
    target = 'b'
    expect(sequentialSearch(arr, target)).toBe(-1)
  })
})
