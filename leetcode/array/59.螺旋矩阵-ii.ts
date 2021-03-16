/*
 * @lc app=leetcode.cn id=59 lang=typescript
 *
 * [59] 螺旋矩阵 II
 *
 * https://leetcode-cn.com/problems/spiral-matrix-ii/description/
 *
 * algorithms
 * Medium (70.31%)
 * Likes:    197
 * Dislikes: 0
 * Total Accepted:    37.5K
 * Total Submissions: 48.3K
 * Testcase Example:  '3'
 *
 * 给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
 *
 * 示例:
 *
 * 输入: 3
 * 输出:
 * [
 * ⁠[ 1, 2, 3 ],
 * ⁠[ 8, 9, 4 ],
 * ⁠[ 7, 6, 5 ]
 * ]
 *
 */

// @lc code=start
// array
var generateMatrix = function (n: number): number[][] {
  let l = 0; // left
  let r = n - 1; // right
  let t = 0; // top
  let b = n - 1; // bottom

  const ret: number[][] = new Array(n).fill(0).map(() => new Array(n));
  let num = 1;
  let tar = n * n;

  while (num <= tar) {
    for (let i = l; i <= r; i++) ret[t][i] = num++; // l -> r
    t++;
    for (let i = t; i <= b; i++) ret[i][r] = num++; // t -> b
    r--;
    for (let i = r; i >= l; i--) ret[b][i] = num++; // r -> l
    b--;
    for (let i = b; i >= t; i--) ret[i][l] = num++; // b -> t
    l++;
  }

  return ret;
};

// array2
var generateMatrix = function (n: number): number[][] {
  let num = 1;
  const tar = n * n;
  const matrix: number[][] = Array.from(new Array(n), () =>
    new Array(n).fill(0)
  );
  let row = 0;
  let column = 0;

  // 右下左上
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let directionIndex = 0;
  while (num <= tar) {
    matrix[row][column] = num;
    num++;
    const nextRow = row + directions[directionIndex][0];
    const nextColumn = column + directions[directionIndex][1];
    if (
      nextRow < 0 ||
      nextRow >= n ||
      nextColumn < 0 ||
      nextColumn >= n ||
      matrix[nextRow][nextColumn] !== 0
    ) {
      directionIndex = (directionIndex + 1) % 4; // 顺时针旋转至下一个方向
    }
    row = row + directions[directionIndex][0];
    column = column + directions[directionIndex][1];
  }
  return matrix;
};
// @lc code=end
