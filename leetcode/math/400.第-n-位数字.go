/*
 * @lc app=leetcode.cn id=400 lang=golang
 *
 * [400] 第 N 位数字
 *
 * https://leetcode-cn.com/problems/nth-digit/description/
 *
 * algorithms
 * Medium (45.44%)
 * Likes:    281
 * Dislikes: 0
 * Total Accepted:    42.2K
 * Total Submissions: 92.8K
 * Testcase Example:  '3'
 *
 * 给你一个整数 n ，请你在无限的整数序列 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...] 中找出并返回第 n
 * 位上的数字。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 11
 * 输出：0
 * 解释：第 11 位数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是 0 ，它是 10 的一部分。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 2^31 - 1
 * 第 n 位上的数字是按计数单位（digit）从前往后数的第 n 个数，参见 示例 2 。
 *
 *
 */

package leetcode

import "math"

// @lc code=start
func findNthDigit(n int) (res int) {
	digit, count := 1, 9

	for n > digit*count {
		n -= digit * count
		digit++
		count *= 10
	}

	index := n - 1
	start := math.Pow(10.0, float64(digit-1))
	num := start + float64(index/digit)
	digitIndex := index % digit
	res = int(num/math.Pow(10.0, float64(digit-digitIndex-1))) % 10.0
	return

}

// @lc code=end
