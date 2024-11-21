/*
 * @lc app=leetcode.cn id=367 lang=golang
 *
 * [367] 有效的完全平方数
 *
 * https://leetcode-cn.com/problems/valid-perfect-square/description/
 *
 * algorithms
 * Easy (43.91%)
 * Likes:    265
 * Dislikes: 0
 * Total Accepted:    88.9K
 * Total Submissions: 200.5K
 * Testcase Example:  '16'
 *
 * 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。
 *
 * 进阶：不要 使用任何内置的库函数，如  sqrt 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num = 16
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：num = 14
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 *
 *
 */

package leetcode

// @lc code=start
// binary search
func isPerfectSquare(num int) bool {
	left, right := 0, num
	if num > 4 {
		right = num / 2
	}

	for left <= right {
		mid := (right-left)/2 + left
		square := mid * mid
		if square == num {
			return true
		} else if square < num {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	return false
}

// @lc code=end
