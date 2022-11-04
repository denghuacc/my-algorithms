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
  const window: Map<string, number> = new Map();
  const needs: Map<string, number> = new Map();
  for (const ch of t) {
    needs.set(ch, (needs.get(ch) ?? 0) + 1);
  }

  let start = 0;
  let minLen = Infinity;
  let left = 0;
  let right = 0;
  let match = 0;
  while (right < s.length) {
    const ch1 = s[right];
    if (needs.has(ch1)) {
      window.set(ch1, (window.get(ch1) ?? 0) + 1);
      if (window.get(ch1) === needs.get(ch1)) {
        match++;
      }
    }
    right++;

    while (match === needs.size) {
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      const ch2 = s[left];
      if (needs.has(ch2)) {
        window.set(ch2, (window.get(ch2) ?? 0) - 1);
        if (window.get(ch2)! < needs.get(ch2)!) {
          match--;
        }
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : s.slice(start, s.length - minLen);
};

// sliding window 2
var minWindow = function (s: string, t: string): string {
  const needs: Map<string, number> = new Map();
  const window: Map<string, number> = new Map();

  const sLen = s.length;
  const tLen = t.length;

  for (const ch of t) {
    needs.set(ch, (needs.get(ch) ?? 0) + 1);
  }

  let left = 0;
  let right = -1;
  let len = Number.MAX_SAFE_INTEGER;
  let retL = -1;
  let retR = -1;

  while (right < sLen) {
    right++;
    const ch1 = s[right];
    if (right < sLen && needs.has(ch1)) {
      window.set(ch1, (window.get(ch1) ?? 0) + 1);
    }
    while (check() && left <= right) {
      if (right - left + 1 < len) {
        len = right - left + 1;
        retL = left;
        retR = left + len;
      }
      const ch2 = s[left];
      if (needs.has(ch2)) {
        window.set(ch2, (window.get(ch2) ?? 0) - 1);
      }
      left++;
    }
  }

  return retL === -1 ? "" : s.slice(retL, retR);

  function check() {
    for (const [key, value] of needs.entries()) {
      if ((window.get(key) ?? 0) < value) {
        return false;
      }
    }
    return true;
  }
};
// @lc code=end
