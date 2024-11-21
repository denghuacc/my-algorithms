/*
 * @lc app=leetcode.cn id=870 lang=golang
 *
 * [870] 优势洗牌
 *
 * https://leetcode.cn/problems/advantage-shuffle/description/
 *
 * algorithms
 * Medium (47.67%)
 * Likes:    257
 * Dislikes: 0
 * Total Accepted:    38K
 * Total Submissions: 78.2K
 * Testcase Example:  '[2,7,11,15]\n[1,10,4,11]'
 *
 * 给定两个大小相等的数组 nums1 和 nums2，nums1 相对于 nums 的优势可以用满足 nums1[i] > nums2[i] 的索引 i
 * 的数目来描述。
 *
 * 返回 nums1 的任意排列，使其相对于 nums2 的优势最大化。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [2,7,11,15], nums2 = [1,10,4,11]
 * 输出：[2,11,7,15]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [12,24,8,32], nums2 = [13,25,32,11]
 * 输出：[24,32,8,12]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length <= 10^5
 * nums2.length == nums1.length
 * 0 <= nums1[i], nums2[i] <= 10^9
 *
 *
 */

package leetcode

import "sort"

// @lc code=start
func advantageCount(nums1 []int, nums2 []int) []int {
	n := len(nums1)
	idx1 := make([]int, n)
	idx2 := make([]int, n)
	for i := 1; i < n; i++ {
		idx1[i] = i
		idx2[i] = i
	}
	sort.Slice(idx1, func(i, j int) bool { return nums1[idx1[i]] < nums1[idx1[j]] })
	sort.Slice(idx2, func(i, j int) bool { return nums2[idx2[i]] < nums2[idx2[j]] })

	res := make([]int, n)
	left, right := 0, n-1
	for i := 0; i < n; i++ {
		if nums1[idx1[i]] > nums2[idx2[left]] {
			res[idx2[left]] = nums1[idx1[i]]
			left++
		} else {
			res[idx2[right]] = nums1[idx1[i]]
			right--
		}
	}
	return res
}

// @lc code=end
