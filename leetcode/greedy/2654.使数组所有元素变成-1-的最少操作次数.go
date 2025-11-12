/*
 * @lc app=leetcode.cn id=2654 lang=golang
 *
 * [2654] 使数组所有元素变成 1 的最少操作次数
 *
 * https://leetcode.cn/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1/description/
 *
 * algorithms
 * Medium (42.88%)
 * Likes:    55
 * Dislikes: 0
 * Total Accepted:    9.5K
 * Total Submissions: 19.4K
 * Testcase Example:  '[2,6,3,4]'
 *
 * 给你一个下标从 0 开始的 正 整数数组 nums 。你可以对数组执行以下操作 任意 次：
 *
 *
 * 选择一个满足 0 <= i < n - 1 的下标 i ，将 nums[i] 或者 nums[i+1] 两者之一替换成它们的最大公约数。
 *
 *
 * 请你返回使数组 nums 中所有元素都等于 1 的 最少 操作次数。如果无法让数组全部变成 1 ，请你返回 -1 。
 *
 * 两个正整数的最大公约数指的是能整除这两个数的最大正整数。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [2,6,3,4]
 * 输出：4
 * 解释：我们可以执行以下操作：
 * - 选择下标 i = 2 ，将 nums[2] 替换为 gcd(3,4) = 1 ，得到 nums = [2,6,1,4] 。
 * - 选择下标 i = 1 ，将 nums[1] 替换为 gcd(6,1) = 1 ，得到 nums = [2,1,1,4] 。
 * - 选择下标 i = 0 ，将 nums[0] 替换为 gcd(2,1) = 1 ，得到 nums = [1,1,1,4] 。
 * - 选择下标 i = 2 ，将 nums[3] 替换为 gcd(1,4) = 1 ，得到 nums = [1,1,1,1] 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [2,10,6,14]
 * 输出：-1
 * 解释：无法将所有元素都变成 1 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 50
 * 1 <= nums[i] <= 10^6
 *
 *
 */

package leetcode

// @lc code=start
func minOperations(nums []int) int {
	num1, g := 0, 0
	for _, num := range nums {
		if num == 1 {
			num1++
		}
		g = gcd(g, num)
	}

	if num1 > 0 {
		return len(nums) - num1
	}

	if g != 1 {
		return -1
	}

	minLen := len(nums)
	for i := 0; i < len(nums); i++ {
		curG := 0
		for j := i; j < len(nums); j++ {
			curG = gcd(curG, nums[j])
			if curG == 1 {
				minLen = min(minLen, j-i+1)
				break
			}
		}
	}
	return minLen - 1 + len(nums) - 1
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

// @lc code=end
