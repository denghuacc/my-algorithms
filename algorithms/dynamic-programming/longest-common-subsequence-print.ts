// 最长公共子序列 lcs (longest common subsequence)
// 最长子序列是指，在两个字符串序列中以相同顺序出现，
// 但不要求连续（非字符串子串）的字符串序列。

export function lcsPrint(wordX: string, wordY: string) {
  const m = wordX.length
  const n = wordY.length
  const list: number[][] = []
  const solution: string[][] = []

  for (let i = 0; i <= m; i++) {
    list[i] = []
    solution[i] = []
    for (let j = 0; j <= n; j++) {
      list[i][j] = 0
      solution[i][j] = '0'
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
  return printSolution(solution, wordX, m, n)
  // return list[m][n]
}

function printSolution(
  solution: string[][],
  wordX: string,
  m: number,
  n: number
) {
  let a = m
  let b = n
  let x = solution[a][b]
  let answer = ''

  while (x !== '0') {
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

  return answer
}
