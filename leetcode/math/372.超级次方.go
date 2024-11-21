/*
 * @lc app=leetcode.cn id=372 lang=golang
 *
 * [372] 超级次方
 *
 * https://leetcode-cn.com/problems/super-pow/description/
 *
 * algorithms
 * Medium (53.04%)
 * Likes:    171
 * Dislikes: 0
 * Total Accepted:    18.8K
 * Total Submissions: 35.4K
 * Testcase Example:  '2\n[3]'
 *
 * 你的任务是计算 a^b 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：a = 2, b = [3]
 * 输出：8
 *
 *
 * 示例 2：
 *
 *
 * 输入：a = 2, b = [1,0]
 * 输出：1024
 *
 *
 * 示例 3：
 *
 *
 * 输入：a = 1, b = [4,3,3,8,5,2]
 * 输出：1
 *
 *
 * 示例 4：
 *
 *
 * 输入：a = 2147483647, b = [2,0,0]
 * 输出：1198
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * 0
 * b 不含前导 0
 *
 *
 */

package leetcode

// @lc code=start
func superPow(a int, b []int) int {
	const mod = 1337
	var pow func(x, n int) int
	pow = func(x, n int) int {
		res := 1
		for ; n > 0; n /= 2 {
			if n&1 > 0 {
				res = res * x % mod
			}
			x = x * x % mod
		}
		return res
	}
	res := 1
	for i := len(b) - 1; i >= 0; i-- {
		res = res * pow(a, b[i]) % mod
		a = pow(a, 10)
	}
	return res
}

// @lc code=end
