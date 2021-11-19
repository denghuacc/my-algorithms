/*
 * @lc app=leetcode.cn id=397 lang=typescript
 *
 * [397] 整数替换
 *
 * https://leetcode-cn.com/problems/integer-replacement/description/
 *
 * algorithms
 * Medium (37.65%)
 * Likes:    135
 * Dislikes: 0
 * Total Accepted:    22.7K
 * Total Submissions: 57K
 * Testcase Example:  '8'
 *
 * 给定一个正整数 n ，你可以做如下操作：
 *
 *
 * 如果 n 是偶数，则用 n / 2替换 n 。
 * 如果 n 是奇数，则可以用 n + 1或n - 1替换 n 。
 *
 *
 * n 变为 1 所需的最小替换次数是多少？
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 8
 * 输出：3
 * 解释：8 -> 4 -> 2 -> 1
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 7
 * 输出：4
 * 解释：7 -> 8 -> 4 -> 2 -> 1
 * 或 7 -> 6 -> 3 -> 2 -> 1
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 4
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 *
 *
 */

// @lc code=start
// hash table
function integerReplacement(n: number): number {
  const map: Map<number, number> = new Map();
  if (n === 1) {
    return 0;
  }
  if (!map.has(n)) {
    if (n % 2 === 0) {
      map.set(n, 1 + integerReplacement(Math.floor(n / 2)));
    } else {
      map.set(
        n,
        1 + Math.min(integerReplacement(n + 1), integerReplacement(n - 1))
      );
    }
  }

  return map.get(n)!;
}
// @lc code=end
