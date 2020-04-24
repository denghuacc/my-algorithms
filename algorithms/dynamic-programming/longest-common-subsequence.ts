// 最长公共子序列 lcs (longest common subsequence) (动态规划版本)
// 最长子序列是指，在两个字符串序列中以相同顺序出现，
// 但不要求连续（非字符串子串）的字符串序列。

export function lcs(wordX: string, wordY: string) {
  const m = wordX.length
  const n = wordY.length
  const list: number[][] = []

  for (let i = 0; i <= m; i++) {
    list[i] = []
    for (let j = 0; j <= n; j++) {
      list[i][j] = 0
    }
  }

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        list[i][j] = 0
      } else if (wordX[i - 1] === wordY[j - 1]) {
        list[i][j] = list[i - 1][j - 1] + 1
      } else {
        const a = list[i - 1][j]
        const b = list[i][j - 1]
        list[i][j] = a > b ? a : b // max(a, b)
      }
    }
    // console.log(list[i].join());
  }
  return list[m][n]
}
