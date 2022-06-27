/*
 * @lc app=leetcode.cn id=522 lang=typescript
 *
 * [522] 最长特殊序列 II
 *
 * https://leetcode.cn/problems/longest-uncommon-subsequence-ii/description/
 *
 * algorithms
 * Medium (42.42%)
 * Likes:    120
 * Dislikes: 0
 * Total Accepted:    13.7K
 * Total Submissions: 32.5K
 * Testcase Example:  '["aba","cdc","eae"]'
 *
 * 给定字符串列表 strs ，返回其中 最长的特殊序列 。如果最长特殊序列不存在，返回 -1 。
 *
 * 特殊序列 定义如下：该序列为某字符串 独有的子序列（即不能是其他字符串的子序列）。
 *
 * s 的 子序列可以通过删去字符串 s 中的某些字符实现。
 *
 *
 * 例如，"abc" 是 "aebdc" 的子序列，因为您可以删除"aebdc"中的下划线字符来得到 "abc"
 * 。"aebdc"的子序列还包括"aebdc"、 "aeb" 和 "" (空字符串)。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: strs = ["aba","cdc","eae"]
 * 输出: 3
 *
 *
 * 示例 2:
 *
 *
 * 输入: strs = ["aaa","aaa","aa"]
 * 输出: -1
 *
 *
 *
 *
 * 提示:
 *
 *
 * 2 <= strs.length <= 50
 * 1 <= strs[i].length <= 10
 * strs[i] 只包含小写英文字母
 *
 *
 */

export {};

// @lc code=start
function findLUSlength(strs: string[]): number {
  const n = strs.length;
  let maxLength = -1;
  for (let i = 0; i < n; i++) {
    let checked = false;
    for (let j = 0; j < n; j++) {
      if (i !== j && isSubsequence(strs[i], strs[j])) {
        checked = true;
        break;
      }
    }
    if (!checked) {
      maxLength = Math.max(maxLength, strs[i].length);
    }
  }
  return maxLength;

  function isSubsequence(s: string, t: string): boolean {
    let ptS = 0;
    let ptT = 0;
    while (ptS < s.length && ptT < t.length) {
      if (s[ptS] === t[ptT]) {
        ptS++;
      }
      ptT++;
    }
    return ptS === s.length;
  }
}
// @lc code=end
