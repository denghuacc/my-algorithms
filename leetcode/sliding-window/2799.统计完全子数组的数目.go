/*
 * @lc app=leetcode.cn id=2799 lang=golang
 *
 * [2799] 统计完全子数组的数目
 *
 * https://leetcode.cn/problems/count-complete-subarrays-in-an-array/description/
 *
 * algorithms
 * Medium (66.98%)
 * Likes:    74
 * Dislikes: 0
 * Total Accepted:    23.3K
 * Total Submissions: 32.6K
 * Testcase Example:  '[1,3,1,2,2]'
 *
 * 给你一个由 正 整数组成的数组 nums 。
 *
 * 如果数组中的某个子数组满足下述条件，则称之为 完全子数组 ：
 *
 *
 * 子数组中 不同 元素的数目等于整个数组不同元素的数目。
 *
 *
 * 返回数组中 完全子数组 的数目。
 *
 * 子数组 是数组中的一个连续非空序列。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,3,1,2,2]
 * 输出：4
 * 解释：完全子数组有：[1,3,1,2]、[1,3,1,2,2]、[3,1,2] 和 [3,1,2,2] 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [5,5,5,5]
 * 输出：10
 * 解释：数组仅由整数 5 组成，所以任意子数组都满足完全子数组的条件。子数组的总数为 10 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 1000
 * 1 <= nums[i] <= 2000
 *
 *
 */

package leetcode

// @lc code=start
func countCompleteSubarrays(nums []int) int {
	res := 0
	cnt := make(map[int]int)
	n, right := len(nums), 0
	distSet := make(map[int]struct{})
	for _, num := range nums {
		distSet[num] = struct{}{}
	}
	dist := len(distSet)
	for left := 0; left < n; left++ {
		if left > 0 {
			cnt[nums[left-1]]--
			if cnt[nums[left-1]] == 0 {
				delete(cnt, nums[left-1])
			}
		}
		for right < n && len(cnt) < dist {
			cnt[nums[right]]++
			right++
		}
		if len(cnt) == dist {
			res += n - right + 1
		}
	}
	return res
}

// @lc code=end
