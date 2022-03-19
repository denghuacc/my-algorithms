/*
 * @lc app=leetcode.cn id=504 lang=golang
 *
 * [504] 七进制数
 *
 * https://leetcode-cn.com/problems/base-7/description/
 *
 * algorithms
 * Easy (52.18%)
 * Likes:    173
 * Dislikes: 0
 * Total Accepted:    71.1K
 * Total Submissions: 136.3K
 * Testcase Example:  '100'
 *
 * 给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: num = 100
 * 输出: "202"
 *
 *
 * 示例 2:
 *
 *
 * 输入: num = -7
 * 输出: "-10"
 *
 *
 *
 *
 * 提示：
 *
 *
 * -10^7 <= num <= 10^7
 *
 *
 */

package leetcode

import "strconv"

// @lc code=start
func convertToBase7(num int) string {
	if num == 0 {
		return "0"
	}
	res := ""
	negative := false
	if num < 0 {
		negative = true
		num = -num
	}
	for num > 0 {
		res = strconv.Itoa(num%7) + res
		num /= 7
	}
	if negative {
		res = "-" + res
	}
	return res
}

// @lc code=end
