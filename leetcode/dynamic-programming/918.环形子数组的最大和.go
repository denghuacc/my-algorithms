/*
 * @lc app=leetcode.cn id=918 lang=golang
 *
 * [918] 环形子数组的最大和
 *
 * https://leetcode.cn/problems/maximum-sum-circular-subarray/description/
 *
 * algorithms
 * Medium (37.85%)
 * Likes:    556
 * Dislikes: 0
 * Total Accepted:    61.4K
 * Total Submissions: 157.6K
 * Testcase Example:  '[1,-2,3,-2]'
 *
 * 给定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。
 *
 * 环形数组 意味着数组的末端将会与开头相连呈环状。形式上， nums[i] 的下一个元素是 nums[(i + 1) % n] ， nums[i]
 * 的前一个元素是 nums[(i - 1 + n) % n] 。
 *
 * 子数组 最多只能包含固定缓冲区 nums 中的每个元素一次。形式上，对于子数组 nums[i], nums[i + 1], ..., nums[j]
 * ，不存在 i <= k1, k2 <= j 其中 k1 % n == k2 % n 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,-2,3,-2]
 * 输出：3
 * 解释：从子数组 [3] 得到最大和 3
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,-3,5]
 * 输出：10
 * 解释：从子数组 [5,5] 得到最大和 5 + 5 = 10
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [3,-2,2,-3]
 * 输出：3
 * 解释：从子数组 [3] 和 [3,-2,2] 都可以得到最大和 3
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 1 <= n <= 3 * 10^4
 * -3 * 10^4 <= nums[i] <= 3 * 10^4​​​​​​​
 *
 *
 */

package leetcode

// @lc code=start
func maxSubarraySumCircular(nums []int) int {
	n := len(nums)
	leftMax := make([]int, n)
	leftMax[0] = nums[0]
	leftSum := nums[0]
	pre, res := nums[0], nums[0]
	for i := 1; i < n; i++ {
		pre = max(pre+nums[i], nums[i])
		res = max(res, pre)
		leftSum += nums[i]
		leftMax[i] = max(leftMax[i-1], leftSum)
	}
	rightSum := 0
	for i := n - 1; i > 0; i-- {
		rightSum += nums[i]
		res = max(res, rightSum+leftMax[i-1])
	}
	return res
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// @lc code=end
