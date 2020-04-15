/**
 * @name matrixChainOrder 矩阵链相乘
 * @description 矩阵链相乘是另一个可以用动态规划解决的著名问题。
 * 这个问题是要找出一组矩阵相乘的最佳方式（顺序）
 */
function matrixChainOrder(p: Array<number>, n: number) {
  // 新增一个显示矩阵
  const s: Array<Array<number>> = []
  for (let i = 0; i <= n; i++) {
    s[i] = []
    for (let j = 0; j <= n; j++) {
      s[i][j] = 0
    }
  }

  const m: Array<Array<number>> = []
  let l

  for (let i = 1; i <= n; i++) {
    m[i] = []
    m[i][i] = 0
  }

  for (l = 2; l < n; l++) {
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

function printOptimalParenthesis(
  s: Array<Array<number>>,
  i: number,
  j: number
) {
  if (i === j) {
    console.log('A[' + i + ']')
  } else {
    console.log('(')
    printOptimalParenthesis(s, i, s[i][j])
    printOptimalParenthesis(s, s[i][j] + 1, j)
    console.log(')')
  }
}

// test
const p = [10, 100, 5, 50, 1],
  size = p.length
console.log(matrixChainOrder(p, size))
