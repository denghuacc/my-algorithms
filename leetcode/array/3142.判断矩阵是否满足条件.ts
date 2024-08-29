/*
 * @lc app=leetcode.cn id=3142 lang=typescript
 *
 * [3142] 判断矩阵是否满足条件
 *
 * https://leetcode.cn/problems/check-if-grid-satisfies-conditions/description/
 *
 * algorithms
 * Easy (65.08%)
 * Likes:    10
 * Dislikes: 0
 * Total Accepted:    8.9K
 * Total Submissions: 12.2K
 * Testcase Example:  '[[1,0,2],[1,0,2]]'
 *
 * 给你一个大小为 m x n 的二维矩阵 grid 。你需要判断每一个格子 grid[i][j] 是否满足：
 *
 *
 * 如果它下面的格子存在，那么它需要等于它下面的格子，也就是 grid[i][j] == grid[i + 1][j] 。
 * 如果它右边的格子存在，那么它需要不等于它右边的格子，也就是 grid[i][j] != grid[i][j + 1] 。
 *
 *
 * 如果 所有 格子都满足以上条件，那么返回 true ，否则返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[1,0,2],[1,0,2]]
 *
 * 输出：true
 *
 * 解释：
 *
 *
 *
 * 网格图中所有格子都符合条件。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[1,1,1],[0,0,0]]
 *
 * 输出：false
 *
 * 解释：
 *
 *
 *
 * 同一行中的格子值都相等。
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[1],[2],[3]]
 *
 * 输出：false
 *
 * 解释：
 *
 *
 *
 * 同一列中的格子值不相等。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n, m <= 10
 * 0 <= grid[i][j] <= 9
 *
 *
 */

// @lc code=start
function satisfiesConditions(grid: number[][]): boolean {
  const n = grid.length;
  for (let i = 1; i < n; i++) {
    if (grid[i - 1].toString() !== grid[i].toString()) {
      return false;
    }
  }
  const m = grid[0].length;
  for (let j = 1; j < m; j++) {
    if (grid[0][j - 1] === grid[0][j]) {
      return false;
    }
  }
  return true;
}
// @lc code=end
