/*
 * @lc app=leetcode.cn id=1232 lang=typescript
 *
 * [1232] 缀点成线
 *
 * https://leetcode-cn.com/problems/check-if-it-is-a-straight-line/description/
 *
 * algorithms
 * Easy (46.39%)
 * Likes:    38
 * Dislikes: 0
 * Total Accepted:    12.7K
 * Total Submissions: 26.8K
 * Testcase Example:  '[[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]'
 *
 * 在一个 XY 坐标系中有一些点，我们用数组 coordinates 来分别记录它们的坐标，其中 coordinates[i] = [x, y]
 * 表示横坐标为 x、纵坐标为 y 的点。
 *
 * 请你来判断，这些点是否在该坐标系中属于同一条直线上，是则返回 true，否则请返回 false。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= coordinates.length <= 1000
 * coordinates[i].length == 2
 * -10^4 <= coordinates[i][0], coordinates[i][1] <= 10^4
 * coordinates 中不含重复的点
 *
 *
 */

// @lc code=start
// math
function checkStraightLine(coordinates: number[][]): boolean {
  const n = coordinates.length;
  const [x, y] = coordinates[0];
  for (let i = 0; i < n; i++) {
    coordinates[i][0] -= x;
    coordinates[i][1] -= y;
  }

  // two points into line
  const a = coordinates[1][0];
  const b = -coordinates[1][1];

  // three points
  for (let i = 2; i < n; i++) {
    const [x, y] = coordinates[i];
    if (a * y + b * x !== 0) {
      return false;
    }
  }

  return true;
}
// @lc code=end
