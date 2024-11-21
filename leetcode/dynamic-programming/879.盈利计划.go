/*
 * @lc app=leetcode.cn id=879 lang=golang
 *
 * [879] 盈利计划
 *
 * https://leetcode-cn.com/problems/profitable-schemes/description/
 *
 * algorithms
 * Hard (55.68%)
 * Likes:    197
 * Dislikes: 0
 * Total Accepted:    19.9K
 * Total Submissions: 35.8K
 * Testcase Example:  '5\n3\n[2,2]\n[2,3]'
 *
 * 集团里有 n 名员工，他们可以完成各种各样的工作创造利润。
 *
 * 第 i 种工作会产生 profit[i] 的利润，它要求 group[i] 名成员共同参与。如果成员参与了其中一项工作，就不能参与另一项工作。
 *
 * 工作的任何至少产生 minProfit 利润的子集称为 盈利计划 。并且工作的成员总数最多为 n 。
 *
 * 有多少种计划可以选择？因为答案很大，所以 返回结果模 10^9 + 7 的值。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 5, minProfit = 3, group = [2,2], profit = [2,3]
 * 输出：2
 * 解释：至少产生 3 的利润，该集团可以完成工作 0 和工作 1 ，或仅完成工作 1 。
 * 总的来说，有两种计划。
 *
 * 示例 2：
 *
 *
 * 输入：n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]
 * 输出：7
 * 解释：至少产生 5 的利润，只要完成其中一种工作就行，所以该集团可以完成任何工作。
 * 有 7 种可能的计划：(0)，(1)，(2)，(0,1)，(0,2)，(1,2)，以及 (0,1,2) 。
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 * 1
 * 1
 * profit.length == group.length
 * 0
 *
 *
 */

package leetcode

// @lc code=start
// dp
func profitableSchemes(n int, minProfit int, group []int, profit []int) int {
	const mod int = 1e9 + 7
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, minProfit+1)
		dp[i][0] = 1
	}
	for i, member := range group {
		earn := profit[i]
		for j := n; j >= member; j-- {
			for k := minProfit; k >= 0; k-- {
				dp[j][k] = (dp[j][k] + dp[j-member][max(0, k-earn)]) % mod
			}
		}
	}
	return dp[n][minProfit]
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

// @lc code=end
