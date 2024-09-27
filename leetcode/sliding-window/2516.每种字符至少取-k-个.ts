/*
 * @lc app=leetcode.cn id=2516 lang=typescript
 *
 * [2516] 每种字符至少取 K 个
 *
 * https://leetcode.cn/problems/take-k-of-each-character-from-left-and-right/description/
 *
 * algorithms
 * Medium (41.93%)
 * Likes:    84
 * Dislikes: 0
 * Total Accepted:    17.4K
 * Total Submissions: 37.2K
 * Testcase Example:  '"aabaaaacaabc"\n2'
 *
 * 给你一个由字符 'a'、'b'、'c' 组成的字符串 s 和一个非负整数 k 。每分钟，你可以选择取走 s 最左侧 还是 最右侧 的那个字符。
 *
 * 你必须取走每种字符 至少 k 个，返回需要的 最少 分钟数；如果无法取到，则返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aabaaaacaabc", k = 2
 * 输出：8
 * 解释：
 * 从 s 的左侧取三个字符，现在共取到两个字符 'a' 、一个字符 'b' 。
 * 从 s 的右侧取五个字符，现在共取到四个字符 'a' 、两个字符 'b' 和两个字符 'c' 。
 * 共需要 3 + 5 = 8 分钟。
 * 可以证明需要的最少分钟数是 8 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "a", k = 1
 * 输出：-1
 * 解释：无法取到一个字符 'b' 或者 'c'，所以返回 -1 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 仅由字母 'a'、'b'、'c' 组成
 * 0 <= k <= s.length
 *
 *
 */

// @lc code=start
// sliding window
var takeCharacters = function (s: string, k: number): number {
  const map = new Map();
  for (const c of s) {
    map.set(c, (map.get(c) ?? 0) + 1);
  }
  const aTotal = map.get("a") ?? 0;
  const bTotal = map.get("b") ?? 0;
  const cTotal = map.get("c") ?? 0;
  if (aTotal < k || bTotal < k || cTotal < k) {
    return -1;
  }
  const n = s.length;
  let aCnt = 0;
  let bCnt = 0;
  let cCnt = 0;
  let l = 0;
  let r = 0;
  let res = 0;
  while (r < n) {
    const c = s[r];
    if (c === "a") {
      aCnt++;
    } else if (c === "b") {
      bCnt++;
    } else {
      cCnt++;
    }
    while (aCnt > aTotal - k || bCnt > bTotal - k || cCnt > cTotal - k) {
      const d = s[l];
      if (d === "a") {
        aCnt--;
      } else if (d === "b") {
        bCnt--;
      } else {
        cCnt--;
      }
      l++;
    }
    res = Math.max(res, r - l + 1);
    r++;
  }
  return n - res;
};

// sliding window
var takeCharacters = function (s: string, k: number): number {
  const cnt = new Array(3).fill(0);
  for (const c of s) {
    cnt[c.charCodeAt(0) - 97]++;
  }
  if (cnt[0] < k || cnt[1] < k || cnt[2] < k) {
    return -1;
  }
  const n = s.length;
  let res = n;
  let l = 0;
  for (let r = 0; r < n; r++) {
    cnt[s[r].charCodeAt(0) - 97]--;
    while (l < r && (cnt[0] < k || cnt[1] < k || cnt[2] < k)) {
      cnt[s[l].charCodeAt(0) - 97]++;
      l++;
    }
    if (cnt[0] >= k && cnt[1] >= k && cnt[2] >= k) {
      res = Math.min(res, n - (r - l + 1));
    }
  }
  return res;
};
// @lc code=end
// 使用数组统计数量更简洁，对比 k 而不是 total - k 也更优雅
// 思路类似，但是方法二使用了反向思维，代码更简洁优雅，深思
