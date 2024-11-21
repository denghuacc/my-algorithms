/*
 * @lc app=leetcode.cn id=1588 lang=golang
 *
 * [1588] 所有奇数长度子数组的和
 *
 * https://leetcode-cn.com/problems/sum-of-all-odd-length-subarrays/description/
 *
 * algorithms
 * Easy (84.08%)
 * Likes:    123
 * Dislikes: 0
 * Total Accepted:    41.2K
 * Total Submissions: 49K
 * Testcase Example:  '[1,4,2,5,3]'
 *
 * 给你一个正整数数组 arr ，请你计算所有可能的奇数长度子数组的和。
 *
 * 子数组 定义为原数组中的一个连续子序列。
 *
 * 请你返回 arr 中 所有奇数长度子数组的和 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [1,4,2,5,3]
 * 输出：58
 * 解释：所有奇数长度子数组和它们的和为：
 * [1] = 1
 * [4] = 4
 * [2] = 2
 * [5] = 5
 * [3] = 3
 * [1,4,2] = 7
 * [4,2,5] = 11
 * [2,5,3] = 10
 * [1,4,2,5,3] = 15
 * 我们将所有值求和得到 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58
 *
 * 示例 2：
 *
 * 输入：arr = [1,2]
 * 输出：3
 * 解释：总共只有 2 个长度为奇数的子数组，[1] 和 [2]。它们的和为 3 。
 *
 * 示例 3：
 *
 * 输入：arr = [10,11,12]
 * 输出：66
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 100
 * 1 <= arr[i] <= 1000
 *
 *
 */

package leetcode

// @lc code=start
func sumOddLengthSubarrays3(arr []int) (sum int) {
	n := len(arr)
	for start := 0; start < n; start++ {
		for length := 1; start+length <= n; length += 2 {
			end := start + length - 1
			for i := start; i <= end; i++ {
				sum += arr[i]
			}
		}
	}
	return
}

// prefix sum
func sumOddLengthSubarrays2(arr []int) (sum int) {
	n := len(arr)
	preSum := make([]int, n+1)
	for i := range arr {
		preSum[i+1] = preSum[i] + arr[i]
	}
	for start := 0; start < n; start++ {
		for length := 1; start+length <= n; length += 2 {
			end := start + length - 1
			sum += preSum[end+1] - preSum[start]
		}
	}
	return
}

// math
func sumOddLengthSubarrays(arr []int) (sum int) {
	n := len(arr)
	for i := 0; i < n; i++ {
		leftCount := i
		rightCount := n - 1 - i
		leftOdd := (leftCount + 1) / 2
		rightOdd := (rightCount + 1) / 2
		leftEven := leftCount/2 + 1
		rightEven := rightCount/2 + 1
		sum += arr[i] * (leftOdd*rightOdd + leftEven*rightEven)
	}
	return
}

// @lc code=end
