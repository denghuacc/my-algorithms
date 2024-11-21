/*
 * @lc app=leetcode.cn id=1417 lang=golang
 *
 * [1417] 重新格式化字符串
 *
 * https://leetcode.cn/problems/reformat-the-string/description/
 *
 * algorithms
 * Easy (51.96%)
 * Likes:    70
 * Dislikes: 0
 * Total Accepted:    34.6K
 * Total Submissions: 62.4K
 * Testcase Example:  '"a0b1c2"'
 *
 * 给你一个混合了数字和字母的字符串 s，其中的字母均为小写英文字母。
 *
 * 请你将该字符串重新格式化，使得任意两个相邻字符的类型都不同。也就是说，字母后面应该跟着数字，而数字后面应该跟着字母。
 *
 * 请你返回 重新格式化后 的字符串；如果无法按要求重新格式化，则返回一个 空字符串 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "a0b1c2"
 * 输出："0a1b2c"
 * 解释："0a1b2c" 中任意两个相邻字符的类型都不同。 "a0b1c2", "0a1b2c", "0c2a1b" 也是满足题目要求的答案。
 *
 *
 * 示例 2：
 *
 * 输入：s = "leetcode"
 * 输出：""
 * 解释："leetcode" 中只有字母，所以无法满足重新格式化的条件。
 *
 *
 * 示例 3：
 *
 * 输入：s = "1229857369"
 * 输出：""
 * 解释："1229857369" 中只有数字，所以无法满足重新格式化的条件。
 *
 *
 * 示例 4：
 *
 * 输入：s = "covid2019"
 * 输出："c2o0v1i9d"
 *
 *
 * 示例 5：
 *
 * 输入：s = "ab123"
 * 输出："1a2b3"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 500
 * s 仅由小写英文字母和/或数字组成。
 *
 *
 */

package leetcode

// @lc code=start
func reformat(s string) string {
	digits, lowercases := []rune{}, []rune{}
	for _, ch := range s {
		if ch >= 'a' {
			lowercases = append(lowercases, ch)
		} else {
			digits = append(digits, ch)
		}
	}

	n1, n2 := len(digits), len(lowercases)
	if abs(n1-n2) > 1 {
		return ""
	}

	res := []rune{}
	for i := 0; i < min(n1, n2); i++ {
		r1, r2 := digits[i], lowercases[i]
		if n1 > n2 {
			res = append(res, r1, r2)
		} else {
			res = append(res, r2, r1)
		}
	}

	if n1 > n2 {
		res = append(res, digits[len(digits)-1])
	}
	if n1 < n2 {
		res = append(res, lowercases[len(lowercases)-1])
	}

	return string(res)
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// @lc code=end
