/*
 * @lc app=leetcode.cn id=1295 lang=golang
 *
 * [1295] 统计位数为偶数的数字
 *
 * https://leetcode.cn/problems/find-numbers-with-even-number-of-digits/description/
 *
 * algorithms
 * Easy (79.30%)
 * Likes:    104
 * Dislikes: 0
 * Total Accepted:    73.1K
 * Total Submissions: 91.3K
 * Testcase Example:  '[12,345,2,6,7896]'
 *
 * 给你一个整数数组 nums，请你返回其中包含 偶数 个数位的数字的个数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [12,345,2,6,7896]
 * 输出：2
 * 解释：
 * 12 是 2 位数字（位数为偶数）
 * 345 是 3 位数字（位数为奇数）
 * 2 是 1 位数字（位数为奇数）
 * 6 是 1 位数字 位数为奇数）
 * 7896 是 4 位数字（位数为偶数）
 * 因此只有 12 和 7896 是位数为偶数的数字
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [555,901,482,1771]
 * 输出：1
 * 解释：
 * 只有 1771 是位数为偶数的数字。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 500
 * 1 <= nums[i] <= 10^5
 *
 *
 */

package leetcode

import "strconv"

// @lc code=start
func findNumbers(nums []int) int {
	cnt := 0
	for _, num := range nums {
		if len(strconv.Itoa(num))%2 == 0 {
			cnt++
		}
	}
	return cnt
}

// @lc code=end
