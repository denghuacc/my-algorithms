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
var generateMatrix = function (n: number): number[][] {
  let l = 0; // left
  let r = n - 1; // right
  let t = 0; // top
  let b = n - 1; // bottom

  const ret = Array(n)
    .fill(0)
    .map(() => new Array(n));
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
// @lc code=end
