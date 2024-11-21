/*
 * @lc app=leetcode.cn id=1044 lang=golang
 *
 * [1044] 最长重复子串
 *
 * https://leetcode-cn.com/problems/longest-duplicate-substring/description/
 *
 * algorithms
 * Hard (25.24%)
 * Likes:    185
 * Dislikes: 0
 * Total Accepted:    8.4K
 * Total Submissions: 33.6K
 * Testcase Example:  '"banana"'
 *
 * 给你一个字符串 s ，考虑其所有 重复子串 ：即，s 的连续子串，在 s 中出现 2 次或更多次。这些出现之间可能存在重叠。
 *
 * 返回 任意一个 可能具有最长长度的重复子串。如果 s 不含重复子串，那么答案为 "" 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "banana"
 * 输出："ana"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "abcd"
 * 输出：""
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= s.length <= 3 * 10^4
 * s 由小写英文字母组成
 *
 *
 */

package leetcode

// @lc code=start
func longestDupSubstring(s string) (res string) {
	const P = 1313131
	n := len(s)
	h := make([]int, n+10)
	p := make([]int, n+10)
	p[0] = 1
	for i := 0; i < n; i++ {
		p[i+1] = p[i] * P
		h[i+1] = h[i]*P + int(s[i])
	}
	l, r := 0, n
	for l < r {
		mid := (l + r + 1) >> 1
		t := check(s, mid, h, p)
		if t != "" {
			l = mid
		} else {
			r = mid - 1
		}
		if len(t) > len(res) {
			res = t
		}
	}
	return
}

func check(s string, length int, h []int, p []int) (res string) {
	n := len(s)
	seen := map[int]bool{}
	for i := 1; i+length-1 <= n; i++ {
		j := i + length - 1
		cur := h[j] - h[i-1]*p[j-i+1]
		if _, ok := seen[cur]; ok {
			return s[i-1 : j]
		}
		seen[cur] = true
	}
	return ""
}

// @lc code=end
