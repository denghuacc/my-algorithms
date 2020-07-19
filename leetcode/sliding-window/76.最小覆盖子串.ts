/*
 * @lc app=leetcode.cn id=76 lang=typescript
 *
 * [76] 最小覆盖子串
 *
 * https://leetcode-cn.com/problems/minimum-window-substring/description/
 *
 * algorithms
 * Hard (32.75%)
 * Likes:    617
 * Dislikes: 0
 * Total Accepted:    59.1K
 * Total Submissions: 155.3K
 * Testcase Example:  '"ADOBECODEBANC"\n"ABC"'
 *
 * 给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字符的最小子串。
 *
 * 示例：
 *
 * 输入: S = "ADOBECODEBANC", T = "ABC"
 * 输出: "BANC"
 *
 * 说明：
 *
 *
 * 如果 S 中不存这样的子串，则返回空字符串 ""。
 * 如果 S 中存在这样的子串，我们保证它是唯一的答案。
 *
 *
 */

// @lc code=start
// sliding window
var minWindow = function (s: string, t: string): string {
  let start = 0;
  let minLen = Infinity;
  let left = 0;
  let right = 0;
  const window: Map<string, number> = new Map();
  const needs: Map<string, number> = new Map();

  for (const c of t) needs.set(c, (needs.get(c) ?? 0) + 1);

  let match = 0;
  while (right < s.length) {
    const c1 = s[right];
    if (needs.has(c1)) {
      window.set(c1, (window.get(c1) ?? 0) + 1);
      if (window.get(c1) === needs.get(c1)) match++;
    }
    right++;

    while (match === needs.size) {
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      const c2 = s[left];
      if (needs.has(c2)) {
        window.set(c2, (window.get(c2) ?? 0) - 1);
        if (window.get(c2)! < needs.get(c2)!) match--;
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : s.substr(start, minLen);
};

// sliding window 2
var minWindow = function (s: string, t: string): string {
  const ori: Map<string, number> = new Map();
  const cnt: Map<string, number> = new Map();

  const sLen = s.length;
  const tLen = t.length;

  for (let i = 0; i < tLen; i++) {
    const c = t[i];
    ori.set(c, (ori.get(c) ?? 0) + 1);
  }

  let l = 0;
  let r = -1;
  let len = Number.MAX_SAFE_INTEGER;
  let retL = -1;
  let retR = -1;

  while (r < sLen) {
    ++r;
    if (r < sLen && ori.has(s[r])) {
      cnt.set(s[r], (cnt.get(s[r]) ?? 0) + 1);
    }
    while (check() && l <= r) {
      if (r - l + 1 < len) {
        len = r - l + 1;
        retL = l;
        retR = l + len;
      }
      if (ori.has(s[l])) {
        cnt.set(s[l], (cnt.get(s[l]) ?? 0) - 1);
      }
      ++l;
    }
  }

  return retL === -1 ? "" : s.substring(retL, retR);

  function check() {
    for (const [key, value] of ori.entries()) {
      if ((cnt.get(key) ?? 0) < value) {
        return false;
      }
    }
    return true;
  }
};
// @lc code=end
