/*
 * @lc app=leetcode.cn id=567 lang=typescript
 *
 * [567] 字符串的排列
 *
 * https://leetcode-cn.com/problems/permutation-in-string/description/
 *
 * algorithms
 * Medium (31.59%)
 * Likes:    154
 * Dislikes: 0
 * Total Accepted:    34.2K
 * Total Submissions: 93.7K
 * Testcase Example:  '"ab"\n"eidbaooo"'
 *
 * 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
 *
 * 换句话说，第一个字符串的排列之一是第二个字符串的子串。
 *
 * 示例1:
 *
 *
 * 输入: s1 = "ab" s2 = "eidbaooo"
 * 输出: True
 * 解释: s2 包含 s1 的排列之一 ("ba").
 *
 *
 *
 *
 * 示例2:
 *
 *
 * 输入: s1= "ab" s2 = "eidboaoo"
 * 输出: False
 *
 *
 *
 *
 * 注意：
 *
 *
 * 输入的字符串只包含小写字母
 * 两个字符串的长度都在 [1, 10,000] 之间
 *
 *
 */

// @lc code=start
// sliding window
function checkInclusion(s1: string, s2: string): boolean {
  const needs: Map<string, number> = new Map();
  const window: Map<string, number> = new Map();
  for (const ch of s1) {
    needs.set(ch, (needs.get(ch) ?? 0) + 1);
  }

  let left = 0;
  let right = 0;
  let match = 0;
  while (right < s2.length) {
    const ch1 = s2[right];
    if (needs.has(ch1)) {
      window.set(ch1, (window.get(ch1) ?? 0) + 1);
      if (window.get(ch1) === needs.get(ch1)) {
        match++;
      }
    }
    right++;
    while (match === needs.size) {
      if (right - left === s1.length) {
        return true;
      }
      const ch2 = s2[left];
      if (needs.has(ch2)) {
        window.set(ch2, (window.get(ch2) ?? 0) - 1);
        if (window.get(ch2)! < needs.get(ch2)!) {
          match--;
        }
      }
      left++;
    }
  }

  return false;
}
// @lc code=end
