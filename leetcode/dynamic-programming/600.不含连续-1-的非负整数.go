/*
 * @lc app=leetcode.cn id=600 lang=golang
 *
 * [600] 不含连续1的非负整数
 *
 * https://leetcode-cn.com/problems/non-negative-integers-without-consecutive-ones/description/
 *
 * algorithms
 * Hard (48.13%)
 * Likes:    264
 * Dislikes: 0
 * Total Accepted:    19.4K
 * Total Submissions: 40.4K
 * Testcase Example:  '5'
 *
 * 给定一个正整数 n，找出小于或等于 n 的非负整数中，其二进制表示不包含 连续的1 的个数。
 *
 * 示例 1:
 *
 * 输入: 5
 * 输出: 5
 * 解释:
 * 下面是带有相应二进制表示的非负整数<= 5：
 * 0 : 0
 * 1 : 1
 * 2 : 10
 * 3 : 11
 * 4 : 100
 * 5 : 101
 * 其中，只有整数3违反规则（有两个连续的1），其他5个满足规则。
 *
 * 说明: 1 <= n <= 10^9
 *
 */

package leetcode

// @lc code=start
// dp
func findIntegers(n int) (ret int) {
	dp := [31]int{}
	dp[0] = 1
	dp[1] = 1
	for i := 2; i < 31; i++ {
		dp[i] = dp[i-1] + dp[i-2]
	}

	pre := 0
	for i := 29; i >= 0; i-- {
		val := 1 << i
		if n&val != 0 {
			ret += dp[i+1]
			if pre == 1 {
				break
			}
			pre = 1
		} else {
			pre = 0
		}

		if i == 0 {
			ret++
		}
	}

	return
}

// @lc code=end
