/*
 * @lc app=leetcode.cn id=1653 lang=typescript
 *
 * [1653] 使字符串平衡的最少删除次数
 *
 * https://leetcode.cn/problems/minimum-deletions-to-make-string-balanced/description/
 *
 * algorithms
 * Medium (55.13%)
 * Likes:    81
 * Dislikes: 0
 * Total Accepted:    14.2K
 * Total Submissions: 23.5K
 * Testcase Example:  '"aababbab"'
 *
 * 给你一个字符串 s ，它仅包含字符 'a' 和 'b'​​​​ 。
 *
 * 你可以删除 s 中任意数目的字符，使得 s 平衡 。当不存在下标对 (i,j) 满足 i < j ，且 s[i] = 'b' 的同时 s[j]= 'a'
 * ，此时认为 s 是 平衡 的。
 *
 * 请你返回使 s 平衡 的 最少 删除次数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aababbab"
 * 输出：2
 * 解释：你可以选择以下任意一种方案：
 * 下标从 0 开始，删除第 2 和第 6 个字符（"aababbab" -> "aaabbb"），
 * 下标从 0 开始，删除第 3 和第 6 个字符（"aababbab" -> "aabbbb"）。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "bbaaaaabb"
 * 输出：2
 * 解释：唯一的最优解是删除最前面两个字符。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s[i] 要么是 'a' 要么是 'b'​ 。​
 *
 *
 */

// @lc code=start
var minimumDeletions = function (s: string): number {
  let res = 0;
  let cnt = 0;
  for (const ch of s) {
    if (ch === "a") {
      cnt++;
    }
  }
  res = cnt;
  for (const ch of s) {
    if (ch === "a") {
      cnt--;
    } else {
      cnt++;
    }
    res = Math.min(res, cnt);
  }
  return res;
};

var minimumDeletions = function (s: string): number {
  let a = 0;
  let b = 0;
  for (const ch of s) {
    if (ch === "a") {
      b = Math.min(a, b + 1);
    } else {
      a += 1;
    }
  }
  return b;
};
// @lc code=end
