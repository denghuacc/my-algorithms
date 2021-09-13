/*
 * @lc app=leetcode.cn id=447 lang=typescript
 *
 * [447] 回旋镖的数量
 *
 * https://leetcode-cn.com/problems/number-of-boomerangs/description/
 *
 * algorithms
 * Medium (62.77%)
 * Likes:    195
 * Dislikes: 0
 * Total Accepted:    39K
 * Total Submissions: 60.1K
 * Testcase Example:  '[[0,0],[1,0],[2,0]]'
 *
 * 给定平面上 n 对 互不相同 的点 points ，其中 points[i] = [xi, yi] 。回旋镖 是由点 (i, j, k) 表示的元组
 * ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。
 *
 * 返回平面上所有回旋镖的数量。
 *
 *
 * 示例 1：
 *
 *
 * 输入：points = [[0,0],[1,0],[2,0]]
 * 输出：2
 * 解释：两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：points = [[1,1],[2,2],[3,3]]
 * 输出：2
 *
 *
 * 示例 3：
 *
 *
 * 输入：points = [[1,1]]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == points.length
 * 1
 * points[i].length == 2
 * -10^4 i, yi
 * 所有点都 互不相同
 *
 *
 */

// @lc code=start
// hash table
function numberOfBoomerangs(points: number[][]): number {
  let ret = 0;
  for (const p of points) {
    const cnt: Map<number, number> = new Map();
    for (const q of points) {
      const dis = (p[0] - q[0]) * (p[0] - q[0]) + (p[1] - q[1]) * (p[1] - q[1]);
      cnt.set(dis, (cnt.get(dis) ?? 0) + 1);
    }
    for (const m of cnt.values()) {
      ret += m * (m - 1);
    }
  }
  return ret;
}
// @lc code=end
