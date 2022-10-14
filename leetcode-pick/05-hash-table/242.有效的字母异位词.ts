/*
 * @lc app=leetcode.cn id=242 lang=typescript
 *
 * [242] 有效的字母异位词
 *
 * https://leetcode-cn.com/problems/valid-anagram/description/
 *
 * algorithms
 * Easy (61.96%)
 * Likes:    285
 * Dislikes: 0
 * Total Accepted:    162.2K
 * Total Submissions: 259.8K
 * Testcase Example:  '"anagram"\n"nagaram"'
 *
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 *
 * 示例 1:
 *
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入: s = "rat", t = "car"
 * 输出: false
 *
 * 说明:
 * 你可以假设字符串只包含小写字母。
 *
 * 进阶:
 * 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 *
 */

// 字母异位词 即是 两个字符串排序后相等。

// @lc code=start
// sort
var isAnagram = function (s: string, t: string): boolean {
  return (
    s.length === t.length && [...s].sort().join("") === [...t].sort().join("")
  );
};

// hash table
var isAnagram = function (s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const map: Map<string, number> = new Map();
  for (const ch of s) {
    map.set(ch, (map.get(ch) ?? 0) + 1);
  }
  for (const ch of t) {
    if (!map.has(ch) || map.get(ch)! < 1) {
      return false;
    } else {
      map.set(ch, map.get(ch)! - 1);
    }
  }
  return true;
};
// @lc code=end
