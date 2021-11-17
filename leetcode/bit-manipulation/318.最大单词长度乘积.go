/*
 * @lc app=leetcode.cn id=318 lang=golang
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

package leetcode

// @lc code=start
// bit manipulation
func maxProduct(words []string) int {
	bit := make([]int, len(words))
	for i := range words {
		for j := 0; j < len(words[i]); j++ {
			bit[i] |= 1 << (words[i][j] - 'a')
		}
	}
	res := 0
	for i := range words {
		for j := i + 1; j < len(words); j++ {
			if bit[i]&bit[j] == 0 {
				res = max(res, len(words[i])*len(words[j]))
			}
		}
	}
	return res
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

// @lc code=end
