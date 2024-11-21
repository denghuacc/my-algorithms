/*
 * @lc app=leetcode.cn id=525 lang=golang
 *
 * [525] 连续数组
 *
 * https://leetcode-cn.com/problems/contiguous-array/description/
 *
 * algorithms
 * Medium (53.59%)
 * Likes:    424
 * Dislikes: 0
 * Total Accepted:    41K
 * Total Submissions: 76.5K
 * Testcase Example:  '[0,1]'
 *
 * 给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [0,1]
 * 输出: 2
 * 说明: [0, 1] 是具有相同数量 0 和 1 的最长连续子数组。
 *
 * 示例 2:
 *
 *
 * 输入: nums = [0,1,0]
 * 输出: 2
 * 说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * nums[i] 不是 0 就是 1
 *
 *
 */

package leetcode

// @lc code=start
// hash table
func findMaxLength(nums []int) (maxLength int) {
	mp := map[int]int{0: -1}
	counter := 0
	for i, num := range nums {
		if num == 1 {
			counter++
		} else {
			counter--
		}
		if prevIndex, has := mp[counter]; has {
			maxLength = max(maxLength, i-prevIndex)
		} else {
			mp[counter] = i
		}
	}
	return

}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

// @lc code=end
