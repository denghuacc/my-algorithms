/*
 * @lc app=leetcode.cn id=301 lang=golang
 *
 * [301] 删除无效的括号
 *
 * https://leetcode-cn.com/problems/remove-invalid-parentheses/description/
 *
 * algorithms
 * Hard (52.44%)
 * Likes:    546
 * Dislikes: 0
 * Total Accepted:    37.1K
 * Total Submissions: 69.5K
 * Testcase Example:  '"()())()"'
 *
 * 给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
 *
 * 返回所有可能的结果。答案可以按 任意顺序 返回。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "()())()"
 * 输出：["(())()","()()()"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "(a)())()"
 * 输出：["(a())()","(a)()()"]
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = ")("
 * 输出：[""]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 由小写英文字母以及括号 '(' 和 ')' 组成
 * s 中至多含 20 个括号
 *
 *
 */

package leetcode

// @lc code=start
// backtracking
func isValid(str string) bool {
	cnt := 0
	for _, ch := range str {
		if ch == '(' {
			cnt++
		} else if ch == ')' {
			cnt--
			if cnt < 0 {
				return false
			}
		}
	}
	return cnt == 0
}

func helper(ans *[]string, str string, start, leftCount, rightCount, leftRemove, rightRemove int) {
	if leftRemove == 0 && rightRemove == 0 {
		if isValid(str) {
			*ans = append(*ans, str)
		}
		return
	}

	for i := start; i < len(str); i++ {
		if i != start && str[i] == str[i-1] {
			continue
		}
		// 如果剩余的字符无法满足去掉的数量要求，直接返回
		if leftRemove+rightRemove > len(str)-i {
			return
		}
		// 尝试去掉一个左括号
		if leftRemove > 0 && str[i] == '(' {
			helper(ans, str[:i]+str[i+1:], i, leftCount, rightCount, leftRemove-1, rightRemove)
		}
		// 尝试去掉一个右括号
		if rightRemove > 0 && str[i] == ')' {
			helper(ans, str[:i]+str[i+1:], i, leftCount, rightCount, leftRemove, rightRemove-1)
		}
		if str[i] == ')' {
			leftCount++
		} else if str[i] == ')' {
			rightCount++
		}
		// 当前右括号的数量大于左括号的数量则为非法,直接返回.
		if rightCount > leftCount {
			break
		}
	}
}

func removeInvalidParentheses(s string) (ret []string) {
	leftRemove, rightRemove := 0, 0
	for _, ch := range s {
		if ch == '(' {
			leftRemove++
		} else if ch == ')' {
			if leftRemove == 0 {
				rightRemove++
			} else {
				leftRemove--
			}
		}
	}

	helper(&ret, s, 0, 0, 0, leftRemove, rightRemove)
	return

}

// @lc code=end
