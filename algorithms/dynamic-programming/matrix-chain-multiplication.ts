// 矩阵链相乘 (动态规划版本)
// 矩阵链相乘是另一个可以用动态规划解决的著名问题。
// 这个问题是要找出一组矩阵相乘的最佳方式（顺序）

export function matrixChainMultiplication(p: number[]) {
  const n = p.length

  const m: number[][] = []
  const s: number[][] = []

  for (let i = 1; i <= n; i++) {
    m[i] = []
    m[i][i] = 0
  }

  for (let i = 0; i <= n; i++) {
    s[i] = []
    for (let j = 0; j <= n; j++) {
      s[i][j] = 0
    }
  }

  for (let l = 2; l < n; l++) {
    for (let i = 1; i <= n - l + 1; i++) {
      let j = i + l - 1
      m[i][j] = Number.MAX_SAFE_INTEGER
      for (let k = i; k <= j - 1; k++) {
        let q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]
        if (q < m[i][j]) {
          m[i][j] = q
          s[i][j] = k
        }
      }
    }
  }

  printOptimalParenthesis(s, 1, n - 1)
  return m[1][n - 1]
}

function printOptimalParenthesis(s: number[][], i: number, j: number) {
  if (i === j) {
    console.log('A[' + i + ']')
  } else {
    printOptimalParenthesis(s, i, s[i][j])
    printOptimalParenthesis(s, s[i][j] + 1, j)
  }
}
