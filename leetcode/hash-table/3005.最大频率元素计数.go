/*
 * @lc app=leetcode.cn id=3005 lang=golang
 *
 * [3005] 最大频率元素计数
 *
 * https://leetcode.cn/problems/count-elements-with-maximum-frequency/description/
 *
 * algorithms
 * Easy (70.79%)
 * Likes:    12
 * Dislikes: 0
 * Total Accepted:    13.4K
 * Total Submissions: 18.3K
 * Testcase Example:  '[1,2,2,3,1,4]'
 *
 * 给你一个由 正整数 组成的数组 nums 。
 *
 * 返回数组 nums 中所有具有 最大 频率的元素的 总频率 。
 *
 * 元素的 频率 是指该元素在数组中出现的次数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,2,3,1,4]
 * 输出：4
 * 解释：元素 1 和 2 的频率为 2 ，是数组中的最大频率。
 * 因此具有最大频率的元素在数组中的数量是 4 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3,4,5]
 * 输出：5
 * 解释：数组中的所有元素的频率都为 1 ，是最大频率。
 * 因此具有最大频率的元素在数组中的数量是 5 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 100
 * 1 <= nums[i] <= 100
 *
 *
 */

package leetcode

// @lc code=start
func maxFrequencyElements(nums []int) int {
	freq := make(map[int]int)
	for _, num := range nums {
		freq[num]++
	}
	res := 0
	maxVal := 0
	for _, f := range freq {
		if f > maxVal {
			maxVal = f
			res = f
		} else if f == maxVal {
			res += f
		}
	}
	return res
}

// @lc code=end
