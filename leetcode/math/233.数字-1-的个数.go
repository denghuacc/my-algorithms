/*
 * @lc app=leetcode.cn id=233 lang=golang
 *
 * [233] 数字 1 的个数
 *
 * https://leetcode-cn.com/problems/number-of-digit-one/description/
 *
 * algorithms
 * Hard (42.99%)
 * Likes:    257
 * Dislikes: 0
 * Total Accepted:    20.1K
 * Total Submissions: 46.9K
 * Testcase Example:  '13'
 *
 * 给定一个整数 n，计算所有小于等于 n 的非负整数中数字 1 出现的个数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 13
 * 输出：6
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 0
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 *
 *
 */

package leetcode

// @lc code=start
// math
func countDigitOne(n int) (ret int) {
	for i := 1; i <= n; i *= 10 {
		divider := i * 10
		p := n / divider
		k := n % divider
		rest := 0

		ret += p * i
		if k > 2*i-1 {
			rest = i
		} else {
			if k < i {
				rest = 0
			} else {
				rest = k - i + 1
			}
		}
		ret += rest
	}
	return ret
}

// @lc code=end
