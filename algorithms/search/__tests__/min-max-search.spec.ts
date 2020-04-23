import { findMinValue, findMaxValue } from '../min-max-search'

describe('Min and Max Values Search', () => {
  const SIZE = 10

  function createSortedArray() {
    const array: number[] = []
    for (let i = 1; i <= SIZE; i++) {
      array.push(i)
    }
    return array
  }

  test('min value - works with empty arrays', () => {
    expect(findMinValue([])).toBe(undefined)
  })

  test('max value - works with empty arrays', () => {
    expect(findMaxValue([])).toBe(undefined)
  })

  test('min value', () => {
    expect(findMinValue(createSortedArray())).toBe(1)
  })

  test('max value', () => {
    expect(findMaxValue(createSortedArray())).toBe(SIZE)
  })
})
