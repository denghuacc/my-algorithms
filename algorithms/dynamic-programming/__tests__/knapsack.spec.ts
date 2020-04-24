import { knapsack } from '../knapsack'

describe('KnapSack Dynamic Programming', () => {
  test('works with DP approach', () => {
    const values = [3, 4, 5]
    const weights = [2, 3, 4]
    const capacity = 5
    const n = values.length

    expect(knapsack(capacity, weights, values, n)).toBe(7)
  })
})
