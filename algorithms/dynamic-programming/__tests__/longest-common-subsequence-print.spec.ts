import { lcsPrint } from '../longest-common-subsequence-print';

describe('LCS Dynamic Programming with print solution', () => {
  test('works with DP approach with print solution', () => {
    const wordX = 'acbaed'
    const wordY = 'abcadf'

    expect(lcsPrint(wordX, wordY)).toBe('acad')
  })
})
