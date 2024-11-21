/*
 * @lc app=leetcode.cn id=476 lang=golang
 *
 * [476] 数字的补数
 *
 * https://leetcode-cn.com/problems/number-complement/description/
 *
 * algorithms
 * Easy (70.87%)
 * Likes:    241
 * Dislikes: 0
 * Total Accepted:    43.3K
 * Total Submissions: 61.2K
 * Testcase Example:  '5'
 *
 * 给你一个 正 整数 num ，输出它的补数。补数是对该数的二进制表示取反。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num = 5
 * 输出：2
 * 解释：5 的二进制表示为 101（没有前导零位），其补数为 010。所以你需要输出 2 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：num = 1
 * 输出：0
 * 解释：1 的二进制表示为 1（没有前导零位），其补数为 0。所以你需要输出 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定的整数 num 保证在 32 位带符号整数的范围内。
 * num >= 1
 * 你可以假定二进制数不包含前导零位。
 * 本题与 1009 https://leetcode-cn.com/problems/complement-of-base-10-integer/ 相同
 *
 *
 */

package leetcode

// @lc code=start
// bit manipulation
func findComplement(num int) int {
	highBit := 0
	for i := 1; i <= 30; i++ {
		if num < 1<<i {
			break
		}
		highBit = i

	}
	mask := 1<<(highBit+1) - 1
	return num ^ mask
}

// @lc code=end
