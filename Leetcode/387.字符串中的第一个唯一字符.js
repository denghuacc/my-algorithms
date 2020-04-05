/*
 * @lc app=leetcode.cn id=387 lang=javascript
 *
 * [387] 字符串中的第一个唯一字符
 *
 * https://leetcode-cn.com/problems/first-unique-character-in-a-string/description/
 *
 * algorithms
 * Easy (35.41%)
 * Total Accepted:    26.5K
 * Total Submissions: 71K
 * Testcase Example:  '"leetcode"'
 *
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 *
 * 案例:
 *
 *
 * s = "leetcode"
 * 返回 0.
 *
 * s = "loveleetcode",
 * 返回 2.
 *
 *
 *
 *
 * 注意事项：您可以假定该字符串只包含小写字母。
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const map = new Map()
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      const count = map.get(s[i])
      map.set(s[i], count + 1)
    } else {
      map.set(s[i], 1)
    }
  }

  for (let i = 0; i < s.length; i++) {
    const count = map.get(s[i])
    if (count === 1) {
      return i
    }
  }

  return -1
}
// @lc code=end
