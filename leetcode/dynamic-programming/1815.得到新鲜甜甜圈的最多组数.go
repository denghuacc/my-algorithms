/*
 * @lc app=leetcode.cn id=1815 lang=golang
 *
 * [1815] 得到新鲜甜甜圈的最多组数
 *
 * https://leetcode.cn/problems/maximum-number-of-groups-getting-fresh-donuts/description/
 *
 * algorithms
 * Hard (32.92%)
 * Likes:    54
 * Dislikes: 0
 * Total Accepted:    4.6K
 * Total Submissions: 10.8K
 * Testcase Example:  '3\n[1,2,3,4,5,6]'
 *
 * 有一个甜甜圈商店，每批次都烤 batchSize 个甜甜圈。这个店铺有个规则，就是在烤一批新的甜甜圈时，之前 所有
 * 甜甜圈都必须已经全部销售完毕。给你一个整数 batchSize 和一个整数数组 groups ，数组中的每个整数都代表一批前来购买甜甜圈的顾客，其中
 * groups[i] 表示这一批顾客的人数。每一位顾客都恰好只要一个甜甜圈。
 *
 * 当有一批顾客来到商店时，他们所有人都必须在下一批顾客来之前购买完甜甜圈。如果一批顾客中第一位顾客得到的甜甜圈不是上一组剩下的，那么这一组人都会很开心。
 *
 * 你可以随意安排每批顾客到来的顺序。请你返回在此前提下，最多 有多少组人会感到开心。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：batchSize = 3, groups = [1,2,3,4,5,6]
 * 输出：4
 * 解释：你可以将这些批次的顾客顺序安排为 [6,2,4,5,1,3] 。那么第 1，2，4，6 组都会感到开心。
 *
 *
 * 示例 2：
 *
 *
 * 输入：batchSize = 4, groups = [1,3,2,5,2,2,1,6]
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * 1
 *
 *
 */

package leetcode

// @lc code=start
// cv
func maxHappyGroups(batchSize int, groups []int) (ans int) {
	const kWidth = 5
	const kWidthMask = 1<<kWidth - 1

	cnt := make([]int, batchSize)
	for _, x := range groups {
		cnt[x%batchSize]++
	}

	start := 0
	for i := batchSize - 1; i > 0; i-- {
		start = start<<kWidth | cnt[i]
	}

	memo := map[int]int{}
	var dfs func(int) int
	dfs = func(mask int) (best int) {
		if mask == 0 {
			return
		}
		if res, ok := memo[mask]; ok {
			return res
		}

		total := 0
		for i := 1; i < batchSize; i++ {
			amount := mask >> ((i - 1) * kWidth) & kWidthMask
			total += i * amount
		}

		for i := 1; i < batchSize; i++ {
			amount := mask >> ((i - 1) * kWidth) & kWidthMask
			if amount > 0 {
				result := dfs(mask - 1<<((i-1)*kWidth))
				if (total-i)%batchSize == 0 {
					result++
				}
				best = max(best, result)
			}
		}
		memo[mask] = best
		return
	}
	return dfs(start) + cnt[0]
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// @lc code=end
