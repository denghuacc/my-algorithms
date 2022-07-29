/*
 * @lc app=leetcode.cn id=593 lang=typescript
 *
 * [593] 有效的正方形
 *
 * https://leetcode.cn/problems/valid-square/description/
 *
 * algorithms
 * Medium (44.15%)
 * Likes:    119
 * Dislikes: 0
 * Total Accepted:    16.1K
 * Total Submissions: 34.9K
 * Testcase Example:  '[0,0]\n[1,1]\n[1,0]\n[0,1]'
 *
 * 给定2D空间中四个点的坐标 p1, p2, p3 和 p4，如果这四个点构成一个正方形，则返回 true 。
 *
 * 点的坐标 pi 表示为 [xi, yi] 。输入 不是 按任何顺序给出的。
 *
 * 一个 有效的正方形 有四条等边和四个等角(90度角)。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
 * 输出: True
 *
 *
 * 示例 2:
 *
 *
 * 输入：p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]
 * 输出：false
 *
 *
 * 示例 3:
 *
 *
 * 输入：p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]
 * 输出：true
 *
 *
 *
 *
 * 提示:
 *
 *
 * p1.length == p2.length == p3.length == p4.length == 2
 * -10^4 <= xi, yi <= 10^4
 *
 *
 */

// @lc code=start
// math
function validSquare(
  p1: number[],
  p2: number[],
  p3: number[],
  p4: number[]
): boolean {
  const points: number[][] = [p1, p2, p3, p4];
  points.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = points;

  // 两条平行线
  const d1 = y3 - y1;
  const d2 = x3 - x1;
  const d3 = y4 - y2;
  const d4 = x4 - x2;

  // 与上面任一条线相邻
  const d5 = y2 - y1;
  const d6 = x2 - x1;

  // 两条对角线
  const d7 = y4 - y1;
  const d8 = x4 - x1;
  const d9 = y3 - y2;
  const d10 = x3 - x2;

  if (
    d1 * d1 + d2 * d2 === d3 * d3 + d4 * d4 && // 平行线相等
    d1 * d1 + d2 * d2 === d5 * d5 + d6 * d6 && // 相邻线相等
    d7 * d7 + d8 * d8 === d9 * d9 + d10 * d10 && // 对角线相等
    d1 * d1 + d2 * d2 !== 0 // 线段长不为零
  ) {
    return true;
  }
  return false;
}
// @lc code=end
