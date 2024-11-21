/*
 * @lc app=leetcode.cn id=713 lang=golang
 *
 * [713] 乘积小于 K 的子数组
 *
 * https://leetcode-cn.com/problems/subarray-product-less-than-k/description/
 *
 * algorithms
 * Medium (45.61%)
 * Likes:    440
 * Dislikes: 0
 * Total Accepted:    48K
 * Total Submissions: 105.3K
 * Testcase Example:  '[10,5,2,6]\n100'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,5,2,6], k = 100
 * 输出：8
 * 解释：8 个乘积小于 100 的子数组分别为：[10]、[5]、[2],、[6]、[10,5]、[5,2]、[2,6]、[5,2,6]。
 * 需要注意的是 [10,5,2] 并不是乘积小于 100 的子数组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3], k = 0
 * 输出：0
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 3 * 10^4
 * 1 <= nums[i] <= 1000
 * 0 <= k <= 10^6
 *
 *
 */

package leetcode

// @lc code=start
func numSubarrayProductLessThanK(nums []int, k int) int {
	left, n := 0, len(nums)
	prod := 1
	res := 0
	for right := 0; right < n; right++ {
		prod *= nums[right]
		for prod >= k && left <= right {
			prod /= nums[left]
			left++
		}
		res += right - left + 1
	}
	return res
}

// @lc code=end
