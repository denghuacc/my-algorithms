/*
 * @lc app=leetcode.cn id=1784 lang=typescript
 *
 * [1784] 检查二进制字符串字段
 *
 * https://leetcode.cn/problems/check-if-binary-string-has-at-most-one-segment-of-ones/description/
 *
 * algorithms
 * Easy (42.91%)
 * Likes:    25
 * Dislikes: 0
 * Total Accepted:    14.6K
 * Total Submissions: 31.2K
 * Testcase Example:  '"1001"'
 *
 * 给你一个二进制字符串 s ，该字符串 不含前导零 。
 *
 * 如果 s 包含 零个或一个由连续的 '1' 组成的字段 ，返回 true​​​ 。否则，返回 false 。
 *
 * 如果 s 中 由连续若干个 '1' 组成的字段 数量不超过 1，返回 true​​​ 。否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "1001"
 * 输出：false
 * 解释：由连续若干个 '1' 组成的字段数量为 2，返回 false
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "110"
 * 输出：true
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 100
 * s[i]​​​​ 为 '0' 或 '1'
 * s[0] 为 '1'
 *
 *
 */

// @lc code=start
// two pointers
var checkOnesSegment = function (s: string): boolean {
  let left = 0;
  let right = s.length - 1;
  while (s[left] === "1") left++;
  while (s[right] === "0") right--;
  return Math.abs(right - left) === 1;
};

var checkOnesSegment = function (s: string): boolean {
  return !s.includes("01");
};
// @lc code=end
