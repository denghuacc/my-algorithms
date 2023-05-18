/*
 * @lc app=leetcode.cn id=1073 lang=golang
 *
 * [1073] 负二进制数相加
 *
 * https://leetcode.cn/problems/adding-two-negabinary-numbers/description/
 *
 * algorithms
 * Medium (35.44%)
 * Likes:    75
 * Dislikes: 0
 * Total Accepted:    6.6K
 * Total Submissions: 16.5K
 * Testcase Example:  '[1,1,1,1,1]\n[1,0,1]'
 *
 * 给出基数为 -2 的两个数 arr1 和 arr2，返回两数相加的结果。
 *
 * 数字以 数组形式 给出：数组由若干 0 和 1 组成，按最高有效位到最低有效位的顺序排列。例如，arr = [1,1,0,1] 表示数字 (-2)^3
 * + (-2)^2 + (-2)^0 = -3。数组形式 中的数字 res 也同样不含前导零：即 arr == [0] 或 arr[0] == 1。
 *
 * 返回相同表示形式的 arr1 和 arr2 相加的结果。两数的表示形式为：不含前导零、由若干 0 和 1 组成的数组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：arr1 = [1,1,1,1,1], arr2 = [1,0,1]
 * 输出：[1,0,0,0,0]
 * 解释：arr1 表示 11，arr2 表示 5，输出表示 16 。
 *
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：arr1 = [0], arr2 = [0]
 * 输出：[0]
 *
 *
 * 示例 3：
 *
 *
 * 输入：arr1 = [0], arr2 = [1]
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 *
 * 1 <= arr1.length, arr2.length <= 1000
 * arr1[i] 和 arr2[i] 都是 0 或 1
 * arr1 和 arr2 都没有前导0
 *
 *
 */

package leetcode

// @lc code=start
func addNegabinary(arr1 []int, arr2 []int) []int {
	i, j := len(arr1)-1, len(arr2)-1
	carry := 0
	res := []int{}
	for i >= 0 || j >= 0 || carry != 0 {
		x := carry
		if i >= 0 {
			x += arr1[i]
		}
		if j >= 0 {
			x += arr2[j]
		}
		if x >= 2 {
			res = append(res, x-2)
			carry = -1
		} else if x >= 0 {
			res = append(res, x)
			carry = 0
		} else {
			res = append(res, 1)
			carry = 1
		}
		i--
		j--
	}
	for len(res) > 1 && res[len(res)-1] == 0 {
		res = res[:len(res)-1]
	}
	for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
		res[i], res[j] = res[j], res[i]
	}
	return res
}

// @lc code=end
