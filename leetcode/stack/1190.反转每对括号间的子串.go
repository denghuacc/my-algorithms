/*
 * @lc app=leetcode.cn id=1190 lang=golang
 *
 * [1190] 反转每对括号间的子串
 *
 * https://leetcode-cn.com/problems/reverse-substrings-between-each-pair-of-parentheses/description/
 *
 * algorithms
 * Medium (61.99%)
 * Likes:    104
 * Dislikes: 0
 * Total Accepted:    17.1K
 * Total Submissions: 27.6K
 * Testcase Example:  '"(abcd)"'
 *
 * 给出一个字符串 s（仅含有小写英文字母和括号）。
 *
 * 请你按照从括号内到外的顺序，逐层反转每对匹配括号中的字符串，并返回最终的结果。
 *
 * 注意，您的结果中 不应 包含任何括号。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "(abcd)"
 * 输出："dcba"
 *
 *
 * 示例 2：
 *
 * 输入：s = "(u(love)i)"
 * 输出："iloveu"
 *
 *
 * 示例 3：
 *
 * 输入：s = "(ed(et(oc))el)"
 * 输出："leetcode"
 *
 *
 * 示例 4：
 *
 * 输入：s = "a(bcdefghijkl(mno)p)q"
 * 输出："apmnolkjihgfedcbq"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s.length <= 2000
 * s 中只有小写英文字母和括号
 * 我们确保所有括号都是成对出现的
 *
 *
 */

package leetcode

func reverseParentheses2(s string) string {
	stack := [][]byte{}
	str := []byte{}

	for i := range s {
		if s[i] == '(' {
			stack = append(stack, str)
			str = []byte{}
		} else if s[i] == ')' {
			for j, n := 0, len(str); j < n/2; j++ {
				str[j], str[n-1-j] = str[n-1-j], str[j]
			}
			str = append(stack[len(stack)-1], str...)
			stack = stack[:len(stack)-1]
		} else {
			str = append(str, s[i])
		}
	}

	return string(str)
}

// @lc code=start
// stack
func reverseParentheses(s string) string {
	n := len(s)
	pair := make([]int, n)
	stack := []int{}

	for i := range s {
		if s[i] == '(' {
			stack = append(stack, i)
		} else if s[i] == ')' {
			j := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			pair[i], pair[j] = j, i
		}
	}

	strArr := []byte{}
	index := 0
	step := 1

	for index < n {
		if s[index] == '(' || s[index] == ')' {
			index = pair[index]
			step = -step
		} else {
			strArr = append(strArr, s[index])
		}

		index += step
	}

	return string(strArr)
}

// @lc code=end
