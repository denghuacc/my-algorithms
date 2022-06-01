/*
 * @lc app=leetcode.cn id=473 lang=golang
 *
 * [473] 火柴拼正方形
 *
 * https://leetcode.cn/problems/matchsticks-to-square/description/
 *
 * algorithms
 * Medium (42.24%)
 * Likes:    308
 * Dislikes: 0
 * Total Accepted:    33.8K
 * Total Submissions: 78.1K
 * Testcase Example:  '[1,1,2,2,2]'
 *
 * 你将得到一个整数数组 matchsticks ，其中 matchsticks[i] 是第 i 个火柴棒的长度。你要用 所有的火柴棍 拼成一个正方形。你
 * 不能折断 任何一根火柴棒，但你可以把它们连在一起，而且每根火柴棒必须 使用一次 。
 *
 * 如果你能使这个正方形，则返回 true ，否则返回 false 。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入: matchsticks = [1,1,2,2,2]
 * 输出: true
 * 解释: 能拼成一个边长为2的正方形，每边两根火柴。
 *
 *
 * 示例 2:
 *
 *
 * 输入: matchsticks = [3,3,3,3,4]
 * 输出: false
 * 解释: 不能用所有火柴拼成一个正方形。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= matchsticks.length <= 15
 * 1 <= matchsticks[i] <= 10^8
 *
 *
 */

package leetcode

import "sort"

// @lc code=start
func makesquare(matchsticks []int) bool {
	n := len(matchsticks)
	if n < 4 {
		return false
	}
	totalLen := 0
	for _, v := range matchsticks {
		totalLen += v
	}
	if totalLen%4 != 0 {
		return false
	}
	sort.Sort(sort.Reverse(sort.IntSlice(matchsticks)))

	edges := [4]int{}
	var dfs func(int) bool
	dfs = func(idx int) bool {
		if idx == n {
			return true
		}
		for i := range edges {
			edges[i] += matchsticks[idx]
			if edges[i] <= totalLen/4 && dfs(idx+1) {
				return true
			}
			edges[i] -= matchsticks[idx]
		}
		return false
	}
	return dfs(0)
}

// @lc code=end
