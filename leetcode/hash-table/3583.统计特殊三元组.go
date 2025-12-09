/*
 * @lc app=leetcode.cn id=3583 lang=golang
 *
 * [3583] 统计特殊三元组
 *
 * https://leetcode.cn/problems/count-special-triplets/description/
 *
 * algorithms
 * Medium (37.28%)
 * Likes:    132
 * Dislikes: 6
 * Total Accepted:    33K
 * Total Submissions: 82.8K
 * Testcase Example:  '[6,3,6]'
 *
 * 给你一个整数数组 nums。
 *
 * 特殊三元组定义为下标三元组 (i, j, k)，满足：
 *
 *
 * 0 <= i < j < k < n，n = nums.length
 * nums[i] == nums[j] * 2
 * nums[k] == nums[j] * 2
 *
 *
 * 返回数组中的特殊三元组总数。答案可能很大，请对 10^9 + 7 取模。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [6,3,6]
 *
 * 输出：1
 *
 * 解释：
 *
 * 唯一的特殊三元组为 (i, j, k) = (0, 1, 2)，其中：
 *
 *
 * nums[0] = 6, nums[1] = 3, nums[2] = 6
 * nums[0] = nums[1] * 2 = 3 * 2 = 6
 * nums[2] = nums[1] * 2 = 3 * 2 = 6
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1,0,0]
 *
 * 输出：1
 *
 * 解释：
 *
 * 唯一的特殊三元组为 (i, j, k) = (0, 2, 3)，其中：
 *
 *
 * nums[0] = 0, nums[2] = 0, nums[3] = 0
 * nums[0] = nums[2] * 2 = 0 * 2 = 0
 * nums[3] = nums[2] * 2 = 0 * 2 = 0
 *
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [8,4,2,8,4]
 *
 * 输出：2
 *
 * 解释：
 *
 * 恰好有两个特殊三元组：
 *
 *
 * (i, j, k) = (0, 1, 3)
 *
 *
 * nums[0] = 8, nums[1] = 4, nums[3] = 8
 * nums[0] = nums[1] * 2 = 4 * 2 = 8
 * nums[3] = nums[1] * 2 = 4 * 2 = 8
 *
 *
 * (i, j, k) = (1, 2, 4)
 *
 * nums[1] = 4, nums[2] = 2, nums[4] = 4
 * nums[1] = nums[2] * 2 = 2 * 2 = 4
 * nums[4] = nums[2] * 2 = 2 * 2 = 4
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= n == nums.length <= 10^5
 * 0 <= nums[i] <= 10^5
 *
 *
 */

package leetcode

// @lc code=start
func specialTriplets(nums []int) int {
	const MOD = 1e9 + 7
	cntMap := make(map[int]int)
	cntLeftMap := make(map[int]int)
	res := 0

	for _, num := range nums {
		cntMap[num]++
	}

	for _, num := range nums {
		target := num * 2
		leftCnt := cntLeftMap[target]
		cntLeftMap[num]++
		ringCnt := cntMap[target] - cntLeftMap[target]
		res += leftCnt * ringCnt % MOD
		res %= MOD
	}

	return res

}

// @lc code=end
