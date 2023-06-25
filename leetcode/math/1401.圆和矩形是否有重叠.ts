/*
 * @lc app=leetcode.cn id=1401 lang=typescript
 *
 * [1401] 圆和矩形是否有重叠
 *
 * https://leetcode.cn/problems/circle-and-rectangle-overlapping/description/
 *
 * algorithms
 * Medium (43.56%)
 * Likes:    71
 * Dislikes: 0
 * Total Accepted:    9.9K
 * Total Submissions: 20.3K
 * Testcase Example:  '1\n0\n0\n1\n-1\n3\n1'
 *
 * 给你一个以 (radius, xCenter, yCenter) 表示的圆和一个与坐标轴平行的矩形 (x1, y1, x2, y2) ，其中 (x1,
 * y1) 是矩形左下角的坐标，而 (x2, y2) 是右上角的坐标。
 *
 * 如果圆和矩形有重叠的部分，请你返回 true ，否则返回 false 。
 *
 * 换句话说，请你检测是否 存在 点 (xi, yi) ，它既在圆上也在矩形上（两者都包括点落在边界上的情况）。
 *
 *
 *
 * 示例 1 ：
 *
 *
 * 输入：radius = 1, xCenter = 0, yCenter = 0, x1 = 1, y1 = -1, x2 = 3, y2 = 1
 * 输出：true
 * 解释：圆和矩形存在公共点 (1,0) 。
 *
 *
 * 示例 2 ：
 *
 *
 * 输入：radius = 1, xCenter = 1, yCenter = 1, x1 = 1, y1 = -3, x2 = 2, y2 = -1
 * 输出：false
 *
 *
 * 示例 3 ：
 *
 *
 * 输入：radius = 1, xCenter = 0, yCenter = 0, x1 = -1, y1 = 0, x2 = 0, y2 = 1
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= radius <= 2000
 * -10^4 <= xCenter, yCenter <= 10^4
 * -10^4 <= x1 < x2 <= 10^4
 * -10^4 <= y1 < y2 <= 10^4
 *
 *
 */

// @lc code=start
// 求圆心到矩形区域的最短距离
function checkOverlap(
  radius: number,
  xCenter: number,
  yCenter: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): boolean {
  let dist = 0;
  if (xCenter < x1 || xCenter > x2) {
    dist += Math.min((x1 - xCenter) ** 2, (x2 - xCenter) ** 2);
  }
  if (yCenter < y1 || yCenter > y2) {
    dist += Math.min((y1 - yCenter) ** 2, (y2 - yCenter) ** 2);
  }
  return dist <= radius ** 2;
}
// @lc code=end
