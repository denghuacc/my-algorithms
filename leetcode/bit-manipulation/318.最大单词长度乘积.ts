/*
 * @lc app=leetcode.cn id=318 lang=typescript
 *
 * [318] 最大单词长度乘积
 *
 * https://leetcode-cn.com/problems/maximum-product-of-word-lengths/description/
 *
 * algorithms
 * Medium (68.92%)
 * Likes:    224
 * Dislikes: 0
 * Total Accepted:    26.5K
 * Total Submissions: 37.3K
 * Testcase Example:  '["abcw","baz","foo","bar","xtfn","abcdef"]'
 *
 * 给定一个字符串数组 words，找到 length(word[i]) * length(word[j])
 * 的最大值，并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
 * 输出: 16
 * 解释: 这两个单词为 "abcw", "xtfn"。
 *
 * 示例 2:
 *
 *
 * 输入: ["a","ab","abc","d","cd","bcd","abcd"]
 * 输出: 4
 * 解释: 这两个单词为 "ab", "cd"。
 *
 * 示例 3:
 *
 *
 * 输入: ["a","aa","aaa","aaaa"]
 * 输出: 0
 * 解释: 不存在这样的两个单词。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * 1
 * words[i] 仅包含小写字母
 *
 *
 */

// @lc code=start
// bit manipulation
function maxProduct(words: string[]): number {
  const n = words.length;
  const masks: number[] = new Array(n).fill(0);
  let max = 0;

  for (let i = 0; i < n; i++) {
    for (const c of words[i]) {
      masks[i] |= 1 << (c.charCodeAt(0) - "a".charCodeAt(0));
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((masks[i] & masks[j]) === 0) {
        max = Math.max(max, words[i].length * words[j].length);
      }
    }
  }

  return max;
}
// @lc code=end
