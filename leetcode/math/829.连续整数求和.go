/*
 * @lc app=leetcode.cn id=829 lang=golang
 *
 * [829] 连续整数求和
 *
 * https://leetcode.cn/problems/consecutive-numbers-sum/description/
 *
 * algorithms
 * Hard (37.07%)
 * Likes:    172
 * Dislikes: 0
 * Total Accepted:    15K
 * Total Submissions: 36.6K
 * Testcase Example:  '5'
 *
 * 给定一个正整数 n，返回 连续正整数满足所有数字之和为 n 的组数 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: n = 5
 * 输出: 2
 * 解释: 5 = 2 + 3，共有两组连续整数([5],[2,3])求和后为 5。
 *
 * 示例 2:
 *
 *
 * 输入: n = 9
 * 输出: 3
 * 解释: 9 = 4 + 5 = 2 + 3 + 4
 *
 * 示例 3:
 *
 *
 * 输入: n = 15
 * 输出: 4
 * 解释: 15 = 8 + 7 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= n <= 10^9​​​​​​​
 *
 *
 */

package leetcode

// @lc code=start
func consecutiveNumbersSum(n int) (res int) {
	var isKConsecutive func(int, int) bool
	isKConsecutive = func(n, i int) bool {
		if i%2 == 1 {
			return n%i == 0
		}
		return n%i != 0 && 2*n%i == 0
	}

	for i := 1; i*(i+1) <= 2*n; i++ {
		if isKConsecutive(n, i) {
			res++
		}
	}
	return
}

// @lc code=end
