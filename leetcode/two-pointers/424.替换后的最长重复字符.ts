/*
 * @lc app=leetcode.cn id=424 lang=typescript
 *
 * [424] 替换后的最长重复字符
 *
 * https://leetcode-cn.com/problems/longest-repeating-character-replacement/description/
 *
 * algorithms
 * Medium (29.83%)
 * Likes:    133
 * Dislikes: 0
 * Total Accepted:    8.6K
 * Total Submissions: 18K
 * Testcase Example:  '"ABAB"\n2'
 *
 * 给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 k
 * 次。在执行上述操作后，找到包含重复字母的最长子串的长度。
 *
 * 注意:
 * 字符串长度 和 k 不会超过 10^4。
 *
 * 示例 1:
 *
 * 输入:
 * s = "ABAB", k = 2
 *
 * 输出:
 * 4
 *
 * 解释:
 * 用两个'A'替换为两个'B',反之亦然。
 *
 *
 * 示例 2:
 *
 * 输入:
 * s = "AABABBA", k = 1
 *
 * 输出:
 * 4
 *
 * 解释:
 * 将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
 * 子串 "BBBB" 有最长重复字母, 答案为 4。
 *
 *
 */

// @lc code=start
// two pointers
var characterReplacement = function (s: string, k: number): number {
  const map: Map<string, number> = new Map();
  let left = 0;
  let right = 0;
  let max = 0;

  for (; right < s.length; right++) {
    const c1 = s[right];
    map.set(c1, (map.get(c1) ?? 0) + 1);
    max = Math.max(max, map.get(c1)!);

    if (right - left + 1 > max + k) {
      const c2 = s[left];
      map.set(c2, (map.get(c2) ?? 0) - 1);
      left++;
    }
  }

  return right - left;
};
// @lc code=end
