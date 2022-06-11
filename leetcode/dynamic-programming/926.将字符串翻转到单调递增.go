/*
 * @lc app=leetcode.cn id=926 lang=golang
 *
 * [926] 将字符串翻转到单调递增
 *
 * https://leetcode.cn/problems/flip-string-to-monotone-increasing/description/
 *
 * algorithms
 * Medium (60.55%)
 * Likes:    205
 * Dislikes: 0
 * Total Accepted:    17.8K
 * Total Submissions: 29.5K
 * Testcase Example:  '"00110"'
 *
 * 如果一个二进制字符串，是以一些 0（可能没有 0）后面跟着一些 1（也可能没有 1）的形式组成的，那么该字符串是 单调递增 的。
 *
 * 给你一个二进制字符串 s，你可以将任何 0 翻转为 1 或者将 1 翻转为 0 。
 *
 * 返回使 s 单调递增的最小翻转次数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "00110"
 * 输出：1
 * 解释：翻转最后一位得到 00111.
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "010110"
 * 输出：2
 * 解释：翻转得到 011111，或者是 000111。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "00011000"
 * 输出：2
 * 解释：翻转得到 00000000。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s[i] 为 '0' 或 '1'
 *
 *
 */

package leetcode

// @lc code=start
func minFlipsMonoIncr(s string) int {
	dp0, dp1 := 0, 0
	for _, c := range s {
		dp0New := dp0
		dp1New := min(dp1, dp0)
		if c == '1' {
			dp0New++
		} else {
			dp1New++
		}
		dp0, dp1 = dp0New, dp1New
	}
	return min(dp0, dp1)
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// @lc code=end
