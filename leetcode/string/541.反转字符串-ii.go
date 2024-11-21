/*
 * @lc app=leetcode.cn id=541 lang=golang
 *
 * [541] 反转字符串 II
 *
 * https://leetcode-cn.com/problems/reverse-string-ii/description/
 *
 * algorithms
 * Easy (59.28%)
 * Likes:    159
 * Dislikes: 0
 * Total Accepted:    49K
 * Total Submissions: 82.6K
 * Testcase Example:  '"abcdefg"\n2'
 *
 * 给定一个字符串 s 和一个整数 k，从字符串开头算起，每 2k 个字符反转前 k 个字符。
 *
 *
 * 如果剩余字符少于 k 个，则将剩余字符全部反转。
 * 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "abcdefg", k = 2
 * 输出："bacdfeg"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "abcd", k = 2
 * 输出："bacd"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^4
 * s 仅由小写英文组成
 * 1 <= k <= 10^4
 *
 *
 */

package leetcode

// @lc code=start
// string
func reverseStr(s string, k int) string {
	n := len(s)
	t := []byte(s)
	for i := 0; i < n; i += 2 * k {
		sub := t[i:min(i+k, n)]
		for j, n := 0, len(sub); j < n/2; j++ {
			sub[j], sub[n-1-j] = sub[n-1-j], sub[j]
		}
	}
	return string(t)
}

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}

// @lc code=end
