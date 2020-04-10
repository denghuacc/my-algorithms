/**
 * @name lcs 最长公共子序列
 * @description 找出两个字符串序列的最长子序列的长度
 * 最长子序列是指，在两个字符串序列中以相同顺序出现，
 * 但不要求连续（非字符串子串）的字符串序列。
 * @param { String } wordX
 * @param { String } wordY
 */
function lcs(wordX, wordY) {
  const m = wordX.length,
    n = wordY.length
  let list = [],
    solution = []

  for (let i = 0; i <= m; i++) {
    list[i] = []
    solution[i] = []
    for (let j = 0; j <= n; j++) {
      list[i][j] = 0
      solution[i][j] = 0
    }
  }

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        list[i][j] = 0
      } else if (wordX[i - 1] === wordY[j - 1]) {
        list[i][j] = list[i - 1][j - 1] + 1
        solution[i][j] = 'diagonal'
      } else {
        const a = list[i - 1][j]
        const b = list[i][j - 1]
        list[i][j] = a > b ? a : b
        solution[i][j] = list[i][j] === list[i - 1][j] ? 'top' : 'left'
      }
    }
  }
  printSolution(solution, wordX, m, n)
  return list[m][n]
}

/**
 * @name printSolution 打印 lcs 的解决方案
 * @description lcs只输出长度，而不包含 lcs 的实际结果。
 * 要提取这个信息，需要对算法稍作修改，声明一个新的solution矩阵。
 * @param {*} solution
 * @param {*} wordX
 * @param {*} m
 * @param {*} n
 */
function printSolution(solution, wordX, m, n) {
  let a = m,
    b = n,
    x = solution[a][b],
    answer = ''

  while (x !== 0) {
    if (solution[a][b] === 'diagonal') {
      answer = wordX[a - 1] + answer
      a--
      b--
    } else if (solution[a][b] === 'left') {
      b--
    } else if (solution[a][b] === 'top') {
      a--
    }
    x = solution[a][b]
  }

  console.log('lcs:', answer)
}

// test
console.log(lcs('acbaed', 'abcadf'))
// lcs: acad
// 4
