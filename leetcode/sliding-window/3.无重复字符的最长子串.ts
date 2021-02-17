/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (27.86%)
 * Likes:    3405
 * Dislikes: 0
 * Total Accepted:    415.5K
 * Total Submissions: 1.2M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 * 示例 1:
 *
 * 输入: "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 *
 *
 * 示例 2:
 *
 * 输入: "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 *
 * 示例 3:
 *
 * 输入: "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 *
 */

// @lc code=start

// sliding window pseudo code
// int left = 0, right = 0;
// while (right < s.size) {
//     window.add(s[right]);
//     right++;

//     while (valid) {
//         window.remove(s[left]);
//         left++;
//     }
// }

// sliding window
var lengthOfLongestSubstring = function (s: string): number {
  const n = s.length;
  const map = new Map();
  let left = 0;
  let right = 0;
  let ret = 0;

  while (right < n) {
    const c1 = s[right];
    map.set(c1, (map.get(c1) ?? 0) + 1);
    right++;
    // 移动 left 缩小窗口
    while (map.get(c1) > 1) {
      const c2 = s[left];
      map.set(c2, (map.get(c2) ?? 0) - 1);
      left++;
    }
    ret = Math.max(ret, right - left);
  }

  return ret;
};

// sliding window 2
var lengthOfLongestSubstring = function (s: string): number {
  const n = s.length;
  const set = new Set();
  let right = -1; // 右指针未移动
  let ret = 0;

  for (let left = 0; left < n; left++) {
    // 左指针右移 移除一个字符
    if (left !== 0) set.delete(s[left - 1]);
    // 右指针不断右移
    while (right + 1 < n && !set.has(s[right + 1])) {
      set.add(s[right + 1]);
      ++right;
    }
    ret = Math.max(ret, right - left + 1);
  }

  return ret;
};

// array + API
var lengthOfLongestSubstring = function (s: string): number {
  let ret = 0;
  let i = 0;
  let arr: string[] = [];

  while (i < s.length) {
    if (arr.indexOf(s[i]) === -1) {
      arr.push(s[i]);
    } else {
      arr.shift();
      continue;
    }

    ret = Math.max(ret, arr.length);
    i++;
  }

  return ret;
};
// @lc code=end
