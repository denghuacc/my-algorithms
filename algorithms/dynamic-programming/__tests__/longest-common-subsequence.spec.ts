import { lcs } from '../longest-common-subsequence'

describe('LCS Dynamic Programming', () => {
  test('works with DP approach', () => {
    const wordX = 'acbaed'
    const wordY = 'abcadf'

    expect(lcs(wordX, wordY)).toBe(4)
  })
})
