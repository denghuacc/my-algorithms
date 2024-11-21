/*
 * @lc app=leetcode.cn id=446 lang=golang
 *
 * [446] 等差数列划分 II - 子序列
 *
 * https://leetcode-cn.com/problems/arithmetic-slices-ii-subsequence/description/
 *
 * algorithms
 * Hard (38.40%)
 * Likes:    147
 * Dislikes: 0
 * Total Accepted:    6.2K
 * Total Submissions: 13.7K
 * Testcase Example:  '[2,4,6,8,10]'
 *
 * 给你一个整数数组 nums ，返回 nums 中所有 等差子序列 的数目。
 *
 * 如果一个序列中 至少有三个元素 ，并且任意两个相邻元素之差相同，则称该序列为等差序列。
 *
 *
 * 例如，[1, 3, 5, 7, 9]、[7, 7, 7, 7] 和 [3, -1, -5, -9] 都是等差序列。
 * 再例如，[1, 1, 2, 5, 7] 不是等差序列。
 *
 *
 * 数组中的子序列是从数组中删除一些元素（也可能不删除）得到的一个序列。
 *
 *
 * 例如，[2,5,10] 是 [1,2,1,2,4,1,5,10] 的一个子序列。
 *
 *
 * 题目数据保证答案是一个 32-bit 整数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [2,4,6,8,10]
 * 输出：7
 * 解释：所有的等差子序列为：
 * [2,4,6]
 * [4,6,8]
 * [6,8,10]
 * [2,4,6,8]
 * [4,6,8,10]
 * [2,4,6,8,10]
 * [2,6,10]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [7,7,7,7,7]
 * 输出：16
 * 解释：数组中的任意子序列都是等差子序列。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1  <= nums.length <= 1000
 * -2^31 <= nums[i] <= 2^31 - 1
 *
 *
 */

package leetcode

// @lc code=start
// dp
func numberOfArithmeticSlices(nums []int) (ret int) {
	n := len(nums)
	f := make([]map[int]int, n)
	for i := range f {
		f[i] = map[int]int{}
	}
	for i := 0; i < n; i++ {
		for j := 0; j < i; j++ {
			diff := nums[i] - nums[j]
			cnt := f[j][diff]
			ret += cnt
			f[i][diff] += 1 + cnt
		}
	}
	return
}

// @lc code=end
