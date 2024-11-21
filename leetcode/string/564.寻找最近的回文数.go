/*
 * @lc app=leetcode.cn id=564 lang=golang
 *
 * [564] 寻找最近的回文数
 *
 * https://leetcode-cn.com/problems/find-the-closest-palindrome/description/
 *
 * algorithms
 * Hard (30.15%)
 * Likes:    250
 * Dislikes: 0
 * Total Accepted:    22.3K
 * Total Submissions: 73.9K
 * Testcase Example:  '"123"'
 *
 * 给定一个表示整数的字符串 n ，返回与它最近的回文整数（不包括自身）。如果不止一个，返回较小的那个。
 *
 * “最近的”定义为两个整数差的绝对值最小。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: n = "123"
 * 输出: "121"
 *
 *
 * 示例 2:
 *
 *
 * 输入: n = "1"
 * 输出: "0"
 * 解释: 0 和 2是最近的回文，但我们返回最小的，也就是 0。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= n.length <= 18
 * n 只由数字组成
 * n 不含前导 0
 * n 代表在 [1, 10^18 - 1] 范围内的整数
 *
 *
 */

package leetcode

import (
	"math"
	"strconv"
)

// @lc code=start
func nearestPalindromic(n string) string {
	m := len(n)
	candidates := []int{int(math.Pow10(m-1)) - 1, int(math.Pow10(m)) + 1}
	selfPrefix, _ := strconv.Atoi(n[:(m+1)/2])
	for _, x := range []int{selfPrefix - 1, selfPrefix, selfPrefix + 1} {
		y := x
		if m&1 == 1 {
			y /= 10
		}
		for ; y > 0; y /= 10 {
			x = x*10 + y%10
		}
		candidates = append(candidates, x)
	}

	ans := -1
	selfNumber, _ := strconv.Atoi(n)
	for _, candidate := range candidates {
		if candidate != selfNumber {
			if ans == -1 ||
				abs(candidate-selfNumber) < abs(ans-selfNumber) ||
				abs(candidate-selfNumber) == abs(ans-selfNumber) && candidate < ans {
				ans = candidate
			}
		}
	}
	return strconv.Itoa(ans)

}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// @lc code=end
