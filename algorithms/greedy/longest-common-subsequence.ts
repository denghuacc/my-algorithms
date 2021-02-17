// 最长公共子序列 lcs (longest common subsequence) (贪心算法版本)
// 最长子序列是指，在两个字符串序列中以相同顺序出现，
// 但不要求连续（非字符串子串）的字符串序列。

export function lcs(
  wordX: string,
  wordY: string,
  m = wordX.length,
  n = wordY.length
): number {
  if (m === 0 || n === 0) return 0;

  if (wordX[m - 1] === wordY[n - 1]) {
    return 1 + lcs(wordX, wordY, m - 1, n - 1);
  } else {
    const a = lcs(wordX, wordY, m, n - 1);
    const b = lcs(wordX, wordY, m - 1, n);
    return Math.max(a, b);
  }
}
