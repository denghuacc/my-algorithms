/*
 * @lc app=leetcode.cn id=345 lang=golang
 *
 * [345] 反转字符串中的元音字母
 *
 * https://leetcode-cn.com/problems/reverse-vowels-of-a-string/description/
 *
 * algorithms
 * Easy (52.37%)
 * Likes:    184
 * Dislikes: 0
 * Total Accepted:    84.4K
 * Total Submissions: 161.1K
 * Testcase Example:  '"hello"'
 *
 * 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。
 *
 *
 *
 * 示例 1：
 *
 * 输入："hello"
 * 输出："holle"
 *
 *
 * 示例 2：
 *
 * 输入："leetcode"
 * 输出："leotcede"
 *
 *
 *
 * 提示：
 *
 *
 * 元音字母不包含字母 "y" 。
 *
 *
 */

package leetcode

import "strings"

// @lc code=start
// two pointers
func reverseVowels(s string) string {
	const vowels = "aeiouAEIOU"
	t := []byte(s)
	n := len(t)
	i, j := 0, n-1
	for i < j {
		for i < n && !strings.Contains(vowels, string(t[i])) {
			i++
		}
		for j > 0 && !strings.Contains(vowels, string(t[j])) {
			j--
		}
		if i < j {
			t[i], t[j] = t[j], t[i]
			i++
			j--
		}
	}
	return string(t)
}

// @lc code=end
