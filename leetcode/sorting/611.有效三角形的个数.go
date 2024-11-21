/*
 * @lc app=leetcode.cn id=611 lang=golang
 *
 * [611] 有效三角形的个数
 *
 * https://leetcode-cn.com/problems/valid-triangle-number/description/
 *
 * algorithms
 * Medium (48.67%)
 * Likes:    217
 * Dislikes: 0
 * Total Accepted:    21.6K
 * Total Submissions: 42.7K
 * Testcase Example:  '[2,2,3,4]'
 *
 * 给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。
 *
 * 示例 1:
 *
 *
 * 输入: [2,2,3,4]
 * 输出: 3
 * 解释:
 * 有效的组合是:
 * 2,3,4 (使用第一个 2)
 * 2,3,4 (使用第二个 2)
 * 2,2,3
 *
 *
 * 注意:
 *
 *
 * 数组长度不超过1000。
 * 数组里整数的范围为 [0, 1000]。
 *
 *
 */

package leetcode

import "sort"

// @lc code=start

func triangleNumber(nums []int) (ret int) {
	n := len(nums)
	if n < 3 {
		return 0
	}
	sort.Ints(nums)
	for i := 0; i < n; i++ {
		k := i
		for j := i + 1; j < n; j++ {
			for k+1 < n && nums[k+1] < nums[i]+nums[j] {
				k++
			}
			ret += max(k-j, 0)
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
