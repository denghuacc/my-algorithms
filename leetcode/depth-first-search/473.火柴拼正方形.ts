/*
 * @lc app=leetcode.cn id=473 lang=typescript
 *
 * [473] 火柴拼正方形
 *
 * https://leetcode.cn/problems/matchsticks-to-square/description/
 *
 * algorithms
 * Medium (42.24%)
 * Likes:    308
 * Dislikes: 0
 * Total Accepted:    33.8K
 * Total Submissions: 78.1K
 * Testcase Example:  '[1,1,2,2,2]'
 *
 * 你将得到一个整数数组 matchsticks ，其中 matchsticks[i] 是第 i 个火柴棒的长度。你要用 所有的火柴棍 拼成一个正方形。你
 * 不能折断 任何一根火柴棒，但你可以把它们连在一起，而且每根火柴棒必须 使用一次 。
 *
 * 如果你能使这个正方形，则返回 true ，否则返回 false 。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入: matchsticks = [1,1,2,2,2]
 * 输出: true
 * 解释: 能拼成一个边长为2的正方形，每边两根火柴。
 *
 *
 * 示例 2:
 *
 *
 * 输入: matchsticks = [3,3,3,3,4]
 * 输出: false
 * 解释: 不能用所有火柴拼成一个正方形。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= matchsticks.length <= 15
 * 1 <= matchsticks[i] <= 10^8
 *
 *
 */

// @lc code=start
// dfs
function makesquare(matchsticks: number[]): boolean {
  const n = matchsticks.length;
  if (n < 3) {
    return false;
  }
  const totalLen = matchsticks.reduce((a, b) => a + b, 0);
  if (totalLen % 4 !== 0) {
    return false;
  }

  matchsticks.sort((a, b) => a - b);
  for (let i = 0, j = n - 1; i < j; i++, j--) {
    [matchsticks[i], matchsticks[j]] = [matchsticks[j], matchsticks[i]];
  }

  const edges = new Array(4).fill(0);
  const len = totalLen / 4;
  return dfs(0);

  function dfs(index: number) {
    if (index === n) {
      return true;
    }
    for (let i = 0; i < edges.length; i++) {
      edges[i] += matchsticks[index];
      if (edges[i] <= len && dfs(index + 1)) {
        return true;
      }
      edges[i] -= matchsticks[index];
    }
    return false;
  }
}
// @lc code=end
