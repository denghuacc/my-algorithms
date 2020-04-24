import { minCoinChange } from '../min-coin-change'

describe('Greedy: Min Coin Change', () => {
  test('works with amount 0', () => {
    expect(minCoinChange([1, 2, 3], 0)).toEqual([])
  })

  test('works with amount 1', () => {
    expect(minCoinChange([1, 2, 3], 1)).toEqual([1])
  })

  test('works with amount 2', () => {
    expect(minCoinChange([1, 2, 3], 2)).toEqual([2])
  })

  test('works with amount 3', () => {
    expect(minCoinChange([1, 2, 3], 3)).toEqual([3])
  })

  test('works with amount 4', () => {
    expect(minCoinChange([1, 2, 3], 4)).toEqual([3, 1])
  })

  test('works with amount 6', () => {
    expect(minCoinChange([1, 2, 3], 6)).toEqual([3, 3])
  })
})
