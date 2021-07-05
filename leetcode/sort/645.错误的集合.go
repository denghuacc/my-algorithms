/*
 * @lc app=leetcode.cn id=645 lang=golang
 *
 * [645] 错误的集合
 *
 * https://leetcode-cn.com/problems/set-mismatch/description/
 *
 * algorithms
 * Easy (43.72%)
 * Likes:    215
 * Dislikes: 0
 * Total Accepted:    60.9K
 * Total Submissions: 139.2K
 * Testcase Example:  '[1,2,2,4]'
 *
 * 集合 s 包含从 1 到 n 的整数。不幸的是，因为数据错误，导致集合里面某一个数字复制了成了集合里面的另外一个数字的值，导致集合 丢失了一个数字 并且
 * 有一个数字重复 。
 *
 * 给定一个数组 nums 代表了集合 S 发生错误后的结果。
 *
 * 请你找出重复出现的整数，再找到丢失的整数，将它们以数组的形式返回。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,2,4]
 * 输出：[2,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,1]
 * 输出：[1,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * 1
 *
 *
 */

package leetcode

import "sort"

// @lc code=start
// hash table
func findErrorNums2(nums []int) []int {
	cnt := map[int]int{}
	for _, v := range nums {
		cnt[v]++
	}
	ret := make([]int, 2)
	for i := 1; i <= len(nums); i++ {
		if cnt[i] != 0 {
			if cnt[i] == 2 {
				ret[0] = i
			}
		} else {
			ret[1] = i
		}
	}
	return ret
}

// sort
func findErrorNums(nums []int) []int {
	n := len(nums)
	ret := make([]int, 2)
	sort.Ints(nums)
	pre := 0
	for _, v := range nums {
		if v == pre {
			ret[0] = pre
		} else if v-pre > 1 {
			ret[1] = pre + 1
		}
		pre = v
	}

	if nums[n-1] != n {
		ret[1] = n
	}

	return ret
}

// @lc code=end
