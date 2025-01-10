/*
 * @lc app=leetcode.cn id=3297 lang=typescript
 *
 * [3297] 统计重新排列后包含另一个字符串的子字符串数目 I
 *
 * https://leetcode.cn/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-i/description/
 *
 * algorithms
 * Medium (48.92%)
 * Likes:    28
 * Dislikes: 0
 * Total Accepted:    10.6K
 * Total Submissions: 19K
 * Testcase Example:  '"bcca"\n"abc"'
 *
 * 给你两个字符串 word1 和 word2 。
 *
 * 如果一个字符串 x 重新排列后，word2 是重排字符串的 前缀 ，那么我们称字符串 x 是 合法的 。
 *
 * 请你返回 word1 中 合法 子字符串 的数目。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：word1 = "bcca", word2 = "abc"
 *
 * 输出：1
 *
 * 解释：
 *
 * 唯一合法的子字符串是 "bcca" ，可以重新排列得到 "abcc" ，"abc" 是它的前缀。
 *
 *
 * 示例 2：
 *
 *
 * 输入：word1 = "abcabc", word2 = "abc"
 *
 * 输出：10
 *
 * 解释：
 *
 * 除了长度为 1 和 2 的所有子字符串都是合法的。
 *
 *
 * 示例 3：
 *
 *
 * 输入：word1 = "abcabc", word2 = "aaabc"
 *
 * 输出：0
 *
 *
 *
 *
 * 解释：
 *
 *
 * 1 <= word1.length <= 10^5
 * 1 <= word2.length <= 10^4
 * word1 和 word2 都只包含小写英文字母。
 *
 *
 */

// @lc code=start
function validSubstringCount(word1: string, word2: string): number {
  const diff = new Array(26).fill(0);
  for (const c of word2) {
    diff[c.charCodeAt(0) - "a".charCodeAt(0)]--;
  }

  let res = 0;
  let cnt = diff.filter((c) => c < 0).length;
  let l = 0;
  let r = 0;
  while (l < word1.length) {
    while (r < word1.length && cnt > 0) {
      update(word1.charCodeAt(r) - "a".charCodeAt(0), 1);
      r++;
    }
    if (cnt === 0) {
      res += word1.length - r + 1;
    }
    update(word1.charCodeAt(l) - "a".charCodeAt(0), -1);
    l++;
  }

  return res;

  function update(c: number, add: number) {
    diff[c] += add;
    // 表明 diff[c] 由 -1 变为 0
    if (add === 1 && diff[c] === 0) {
      cnt--;
      // 表明 diff[c] 由 0 变为 -1
    } else if (add === -1 && diff[c] === -1) {
      cnt++;
    }
  }
}
// @lc code=end
