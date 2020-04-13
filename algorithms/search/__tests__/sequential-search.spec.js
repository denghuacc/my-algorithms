const { sequentialSearch } = require('../sequential-search')

describe('test sequentialSearch', () => {
  beforeEach(() => {
    array = ['a', 1, 3, 'c']
  })

  test('binarySearch', () => {
    let target = 'a'
    expect(sequentialSearch(array, target)).toBe(0)
    target = 3
    expect(sequentialSearch(array, target)).toBe(2)
    target = 'b'
    expect(sequentialSearch(array, target)).toBe(-1)
  })
})
