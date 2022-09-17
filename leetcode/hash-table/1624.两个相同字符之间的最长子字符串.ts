/*
 * @lc app=leetcode.cn id=1624 lang=typescript
 *
 * [1624] 两个相同字符之间的最长子字符串
 *
 * https://leetcode.cn/problems/largest-substring-between-two-equal-characters/description/
 *
 * algorithms
 * Easy (64.13%)
 * Likes:    57
 * Dislikes: 0
 * Total Accepted:    32.9K
 * Total Submissions: 51.3K
 * Testcase Example:  '"aa"'
 *
 * 给你一个字符串 s，请你返回 两个相同字符之间的最长子字符串的长度 ，计算长度时不含这两个字符。如果不存在这样的子字符串，返回 -1 。
 *
 * 子字符串 是字符串中的一个连续字符序列。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "aa"
 * 输出：0
 * 解释：最优的子字符串是两个 'a' 之间的空子字符串。
 *
 * 示例 2：
 *
 * 输入：s = "abca"
 * 输出：2
 * 解释：最优的子字符串是 "bc" 。
 *
 *
 * 示例 3：
 *
 * 输入：s = "cbzxy"
 * 输出：-1
 * 解释：s 中不存在出现出现两次的字符，所以返回 -1 。
 *
 *
 * 示例 4：
 *
 * 输入：s = "cabbac"
 * 输出：4
 * 解释：最优的子字符串是 "abba" ，其他的非最优解包括 "bb" 和 "" 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 300
 * s 只含小写英文字母
 *
 *
 */

// @lc code=start
// hash table
var maxLengthBetweenEqualCharacters = function (s: string): number {
  const map: Map<string, number[]> = new Map();
  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) {
      map.set(s[i], [i]);
    } else {
      map.get(s[i])?.push(i);
    }
  }
  let max = -1;
  for (const indexes of map.values()) {
    if (indexes.length >= 2) {
      max = Math.max(max, indexes[indexes.length - 1] - indexes[0] - 1);
    }
  }
  return max;
};

// array
var maxLengthBetweenEqualCharacters = function (s: string): number {
  const letters: number[] = new Array(26).fill(-1);
  let max = -1;
  for (let i = 0; i < s.length; i++) {
    const idx = getCharCode(s[i]);
    if (letters[idx] === -1) {
      letters[idx] = i;
    } else {
      max = Math.max(max, i - letters[idx] - 1);
    }
  }
  return max;

  function getCharCode(ch: string): number {
    return ch.charCodeAt(0) - "a".charCodeAt(0);
  }
};
// @lc code=end
