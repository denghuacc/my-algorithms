/*
 * @lc app=leetcode.cn id=395 lang=typescript
 *
 * [395] 至少有 K 个重复字符的最长子串
 *
 * https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters/description/
 *
 * algorithms
 * Medium (47.19%)
 * Likes:    311
 * Dislikes: 0
 * Total Accepted:    21.8K
 * Total Submissions: 46.3K
 * Testcase Example:  '"aaabb"\n3'
 *
 * 给你一个字符串 s 和一个整数 k ，请你找出 s 中的最长子串， 要求该子串中的每一字符出现次数都不少于 k 。返回这一子串的长度。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aaabb", k = 3
 * 输出：3
 * 解释：最长子串为 "aaa" ，其中 'a' 重复了 3 次。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "ababbc", k = 2
 * 输出：5
 * 解释：最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 仅由小写英文字母组成
 * 1
 *
 *
 */

// @lc code=start
// sliding window
function longestSubstring(s: string, k: number): number {
  let ret = 0;
  const n = s.length;
  for (let t = 1; t <= 26; t++) {
    let l = 0;
    let r = 0;
    const count: number[] = new Array(26).fill(0);
    let tot = 0;
    let less = 0;
    while (r < n) {
      count[getCharCode(s[r])]++;
      if (count[getCharCode(s[r])] === 1) {
        tot++;
        less++;
      }
      if (count[getCharCode(s[r])] === k) {
        less--;
      }

      while (tot > t) {
        count[getCharCode(s[l])]--;
        if (count[getCharCode(s[l])] === k - 1) {
          less++;
        }
        if (count[getCharCode(s[l])] === 0) {
          tot--;
          less--;
        }
        l++;
      }
      if (less === 0) {
        ret = Math.max(ret, r - l + 1);
      }
      r++;
    }
  }
  return ret;

  function getCharCode(char: string) {
    return char.charCodeAt(0) - "a".charCodeAt(0);
  }
}

// @lc code=end
