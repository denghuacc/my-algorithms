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
  let left = 0;
  let right = 0;
  const window: Map<string, number> = new Map();
  const needs: Map<string, number> = new Map();
  let match = 0;
  for (let i = 0; i < s1.length; i++) {
    const c = s1[i];
    needs.set(c, (needs.get(c) ?? 0) + 1);
  }

  while (right < s2.length) {
    const c1 = s2[right];
    if (needs.has(c1)) {
      window.set(c1, (window.get(c1) ?? 0) + 1);
      if (window.get(c1) === needs.get(c1)) match++;
    }
    right++;
    while (match === needs.size) {
      if (right - left === s1.length) return true;
      const c2 = s2[left];
      if (needs.has(c2)) {
        window.set(c2, (window.get(c2) ?? 0) - 1);
        if (window.get(c2)! < needs.get(c2)!) match--;
      }
      left++;
    }
  }

  return false;
}
// @lc code=end
