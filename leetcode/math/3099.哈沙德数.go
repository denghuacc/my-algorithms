/*
 * @lc app=leetcode.cn id=3099 lang=golang
 *
 * [3099] 哈沙德数
 *
 * https://leetcode.cn/problems/harshad-number/description/
 *
 * algorithms
 * Easy (84.00%)
 * Likes:    14
 * Dislikes: 0
 * Total Accepted:    16.3K
 * Total Submissions: 19K
 * Testcase Example:  '18'
 *
 * 如果一个整数能够被其各个数位上的数字之和整除，则称之为 哈沙德数（Harshad number）。给你一个整数 x 。如果 x 是 哈沙德数 ，则返回
 * x 各个数位上的数字之和，否则，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： x = 18
 *
 * 输出： 9
 *
 * 解释：
 *
 * x 各个数位上的数字之和为 9 。18 能被 9 整除。因此 18 是哈沙德数，答案是 9 。
 *
 *
 * 示例 2：
 *
 *
 * 输入： x = 23
 *
 * 输出： -1
 *
 * 解释：
 *
 * x 各个数位上的数字之和为 5 。23 不能被 5 整除。因此 23 不是哈沙德数，答案是 -1 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= x <= 100
 *
 *
 */

package leetcode

// @lc code=start
func sumOfTheDigitsOfHarshadNumber(x int) int {
	sum := 0
	cur := x
	for cur > 0 {
		sum += cur % 10
		cur /= 10
	}
	if x%sum == 0 {
		return sum
	}
	return -1
}

// @lc code=end
