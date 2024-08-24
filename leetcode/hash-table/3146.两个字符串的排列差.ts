/*
 * @lc app=leetcode.cn id=3146 lang=typescript
 *
 * [3146] 两个字符串的排列差
 *
 * https://leetcode.cn/problems/permutation-difference-between-two-strings/description/
 *
 * algorithms
 * Easy (86.34%)
 * Likes:    10
 * Dislikes: 0
 * Total Accepted:    10.9K
 * Total Submissions: 12.5K
 * Testcase Example:  '"abc"\n"bac"'
 *
 * 给你两个字符串 s 和 t，每个字符串中的字符都不重复，且 t 是 s 的一个排列。
 *
 * 排列差 定义为 s 和 t 中每个字符在两个字符串中位置的绝对差值之和。
 *
 * 返回 s 和 t 之间的 排列差 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "abc", t = "bac"
 *
 * 输出：2
 *
 * 解释：
 *
 * 对于 s = "abc" 和 t = "bac"，排列差是：
 *
 *
 * "a" 在 s 中的位置与在 t 中的位置之差的绝对值。
 * "b" 在 s 中的位置与在 t 中的位置之差的绝对值。
 * "c" 在 s 中的位置与在 t 中的位置之差的绝对值。
 *
 *
 * 即，s 和 t 的排列差等于 |0 - 1| + |2 - 2| + |1 - 0| = 2。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "abcde", t = "edbac"
 *
 * 输出：12
 *
 * 解释： s 和 t 的排列差等于 |0 - 3| + |1 - 2| + |2 - 4| + |3 - 1| + |4 - 0| = 12。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 26
 * 每个字符在 s 中最多出现一次。
 * t 是 s 的一个排列。
 * s 仅由小写英文字母组成。
 *
 *
 */

// @lc code=start
function findPermutationDifference(s: string, t: string): number {
  const map: Map<string, number> = new Map();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], i);
  }
  let res = 0;
  for (let i = 0; i < t.length; i++) {
    const idx = map.get(t[i])!;
    res += Math.abs(i - idx);
  }
  return res;
}
// @lc code=end
