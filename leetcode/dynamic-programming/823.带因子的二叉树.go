/*
 * @lc app=leetcode.cn id=823 lang=golang
 *
 * [823] 带因子的二叉树
 *
 * https://leetcode.cn/problems/binary-trees-with-factors/description/
 *
 * algorithms
 * Medium (47.24%)
 * Likes:    142
 * Dislikes: 0
 * Total Accepted:    11.1K
 * Total Submissions: 23.6K
 * Testcase Example:  '[2,4]'
 *
 * 给出一个含有不重复整数元素的数组 arr ，每个整数 arr[i] 均大于 1。
 *
 * 用这些整数来构建二叉树，每个整数可以使用任意次数。其中：每个非叶结点的值应等于它的两个子结点的值的乘积。
 *
 * 满足条件的二叉树一共有多少个？答案可能很大，返回 对 10^9 + 7 取余 的结果。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: arr = [2, 4]
 * 输出: 3
 * 解释: 可以得到这些二叉树: [2], [4], [4, 2, 2]
 *
 * 示例 2:
 *
 *
 * 输入: arr = [2, 4, 5, 10]
 * 输出: 7
 * 解释: 可以得到这些二叉树: [2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2].
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 1000
 * 2 <= arr[i] <= 10^9
 * arr 中的所有值 互不相同
 *
 *
 */

package leetcode

import "sort"

// @lc code=start
func numFactoredBinaryTrees(arr []int) (res int) {
	const MOD = 1000000007
	n := len(arr)
	dp := make([]int, n)
	for i := range dp {
		dp[i] = 1
	}
	sort.Ints(arr)
	for i := range arr {
		for left, right := 0, n-1; left <= right; left++ {
			for left < right && arr[left]*arr[right] > arr[i] {
				right--
			}
			if left <= right && arr[left]*arr[right] == arr[i] {
				if arr[left] != arr[right] {
					dp[i] = (dp[i] + dp[left]*dp[right]*2) % MOD
				} else {
					dp[i] = (dp[i] + dp[left]*dp[right]) % MOD
				}
			}
		}
		res = (res + dp[i]) % MOD
	}
	return
}

// @lc code=end
