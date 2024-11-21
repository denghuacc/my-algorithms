/*
 * @lc app=leetcode.cn id=29 lang=golang
 *
 * [29] 两数相除
 *
 * https://leetcode-cn.com/problems/divide-two-integers/description/
 *
 * algorithms
 * Medium (21.12%)
 * Likes:    691
 * Dislikes: 0
 * Total Accepted:    116.2K
 * Total Submissions: 549.8K
 * Testcase Example:  '10\n3'
 *
 * 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
 *
 * 返回被除数 dividend 除以除数 divisor 得到的商。
 *
 * 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) =
 * -2
 *
 *
 *
 * 示例 1:
 *
 * 输入: dividend = 10, divisor = 3
 * 输出: 3
 * 解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
 *
 * 示例 2:
 *
 * 输入: dividend = 7, divisor = -3
 * 输出: -2
 * 解释: 7/-3 = truncate(-2.33333..) = -2
 *
 *
 *
 * 提示：
 *
 *
 * 被除数和除数均为 32 位有符号整数。
 * 除数不为 0。
 * 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1。
 *
 *
 */

package leetcode

import "math"

// @lc code=start
// binary search
func divide(dividend int, divisor int) int {
	MAX := int(math.Pow(2, 31) - 1)
	MIN := int(-math.Pow(2, 31))

	if dividend == MIN {
		if divisor == 1 {
			return MIN
		}
		if divisor == -1 {
			return MAX
		}
	}

	if divisor == MIN {
		if dividend == MIN {
			return 1
		} else {
			return 0
		}
	}

	if divisor == 0 {
		return 0
	}

	rev := false
	if dividend > 0 {
		dividend = -dividend
		rev = !rev
	}
	if divisor > 0 {
		divisor = -divisor
		rev = !rev
	}

	candidates := []int{}
	candidates = append(candidates, divisor)
	index := 0
	for candidates[index] >= dividend-candidates[index] {
		candidates = append(candidates, candidates[index]+candidates[index])
		index++
	}
	ret := 0
	for i := len(candidates) - 1; i >= 0; i-- {
		if candidates[i] >= dividend {
			ret += 1 << i
			dividend -= candidates[i]
		}
	}

	if rev {
		return -ret
	} else {
		return ret
	}
}

// @lc code=end
