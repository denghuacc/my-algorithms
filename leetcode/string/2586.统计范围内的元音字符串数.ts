/*
 * @lc app=leetcode.cn id=2586 lang=typescript
 *
 * [2586] 统计范围内的元音字符串数
 *
 * https://leetcode.cn/problems/count-the-number-of-vowel-strings-in-range/description/
 *
 * algorithms
 * Easy (78.97%)
 * Likes:    25
 * Dislikes: 0
 * Total Accepted:    21.2K
 * Total Submissions: 25.8K
 * Testcase Example:  '["are","amy","u"]\n0\n2'
 *
 * 给你一个下标从 0 开始的字符串数组 words 和两个整数：left 和 right 。
 *
 * 如果字符串以元音字母开头并以元音字母结尾，那么该字符串就是一个 元音字符串 ，其中元音字母是 'a'、'e'、'i'、'o'、'u' 。
 *
 * 返回 words[i] 是元音字符串的数目，其中 i 在闭区间 [left, right] 内。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：words = ["are","amy","u"], left = 0, right = 2
 * 输出：2
 * 解释：
 * - "are" 是一个元音字符串，因为它以 'a' 开头并以 'e' 结尾。
 * - "amy" 不是元音字符串，因为它没有以元音字母结尾。
 * - "u" 是一个元音字符串，因为它以 'u' 开头并以 'u' 结尾。
 * 在上述范围中的元音字符串数目为 2 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：words = ["hey","aeo","mu","ooo","artro"], left = 1, right = 4
 * 输出：3
 * 解释：
 * - "aeo" 是一个元音字符串，因为它以 'a' 开头并以 'o' 结尾。
 * - "mu" 不是元音字符串，因为它没有以元音字母开头。
 * - "ooo" 是一个元音字符串，因为它以 'o' 开头并以 'o' 结尾。
 * - "artro" 是一个元音字符串，因为它以 'a' 开头并以 'o' 结尾。
 * 在上述范围中的元音字符串数目为 3 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= words.length <= 1000
 * 1 <= words[i].length <= 10
 * words[i] 仅由小写英文字母组成
 * 0 <= left <= right < words.length
 *
 *
 */

// @lc code=start
function vowelStrings(words: string[], left: number, right: number): number {
  words = words.slice(left, right + 1);
  let res = 0;
  for (const word of words) {
    if (isVowelString(word)) {
      res++;
    }
  }
  return res;

  function isVowelString(word: string) {
    return isVowel(word[0]) && isVowel(word[word.length - 1]);
  }

  function isVowel(ch: string) {
    return ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u";
  }
}
// @lc code=end
