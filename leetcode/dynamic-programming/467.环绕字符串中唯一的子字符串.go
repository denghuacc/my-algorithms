/*
 * @lc app=leetcode.cn id=467 lang=golang
 *
 * [467] 环绕字符串中唯一的子字符串
 *
 * https://leetcode.cn/problems/unique-substrings-in-wraparound-string/description/
 *
 * algorithms
 * Medium (44.87%)
 * Likes:    232
 * Dislikes: 0
 * Total Accepted:    15K
 * Total Submissions: 31.4K
 * Testcase Example:  '"a"'
 *
 * 把字符串 s 看作是 “abcdefghijklmnopqrstuvwxyz” 的无限环绕字符串，所以 s 看起来是这样的：
 *
 *
 * "...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd...." .
 *
 *
 * 现在给定另一个字符串 p 。返回 s 中 唯一 的 p 的 非空子串 的数量 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: p = "a"
 * 输出: 1
 * 解释: 字符串 s 中只有一个"a"子字符。
 *
 *
 * 示例 2:
 *
 *
 * 输入: p = "cac"
 * 输出: 2
 * 解释: 字符串 s 中的字符串“cac”只有两个子串“a”、“c”。.
 *
 *
 * 示例 3:
 *
 *
 * 输入: p = "zab"
 * 输出: 6
 * 解释: 在字符串 s 中有六个子串“z”、“a”、“b”、“za”、“ab”、“zab”。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= p.length <= 10^5
 * p 由小写英文字母构成
 *
 *
 */

package leetcode

// @lc code=start
func findSubstringInWraproundString(p string) int {
	dp := make([]int, 26)
	k := 0

	for i := 0; i < len(p); i++ {
		if i > 0 && (p[i]-p[i-1]+26)%26 == 1 {
			k++
		} else {
			k = 1
		}

		dp[p[i]-'a'] = max(dp[p[i]-'a'], k)
	}

	res := 0
	for _, v := range dp {
		res += v
	}
	return res
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// @lc code=end
