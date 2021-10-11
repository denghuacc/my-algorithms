/*
 * @lc app=leetcode.cn id=273 lang=golang
 *
 * [273] 整数转换英文表示
 *
 * https://leetcode-cn.com/problems/integer-to-english-words/description/
 *
 * algorithms
 * Hard (34.02%)
 * Likes:    178
 * Dislikes: 0
 * Total Accepted:    15.4K
 * Total Submissions: 45.2K
 * Testcase Example:  '123'
 *
 * 将非负整数 num 转换为其对应的英文表示。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num = 123
 * 输出："One Hundred Twenty Three"
 *
 *
 * 示例 2：
 *
 *
 * 输入：num = 12345
 * 输出："Twelve Thousand Three Hundred Forty Five"
 *
 *
 * 示例 3：
 *
 *
 * 输入：num = 1234567
 * 输出："One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
 *
 *
 * 示例 4：
 *
 *
 * 输入：num = 1234567891
 * 输出："One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven
 * Thousand Eight Hundred Ninety One"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 *
 *
 */

package leetcode

import "strings"

// @lc code=start
var (
	singles   = []string{"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"}
	teens     = []string{"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"}
	tens      = []string{"", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"}
	thousands = []string{"", "Thousand", "Million", "Billion"}
)

// recursive
func numberToWords2(num int) string {
	if num == 0 {
		return "Zero"
	}
	sb := &strings.Builder{}
	var recursion func(int)
	recursion = func(num int) {
		switch {
		case num == 0:
		case num < 10:
			sb.WriteString(singles[num])
			sb.WriteByte(' ')
		case num < 20:
			sb.WriteString(teens[num-10])
			sb.WriteByte(' ')
		case num < 100:
			sb.WriteString(tens[num/10])
			sb.WriteByte(' ')
			recursion(num % 10)
		default:
			sb.WriteString(singles[num/100])
			sb.WriteString(" Hundred ")
			recursion(num % 100)
		}
	}
	for i, unit := 3, int(1e9); i >= 0; i-- {
		if curNum := num / unit; curNum > 0 {
			num -= curNum * unit
			recursion(curNum)
			sb.WriteString(thousands[i])
			sb.WriteByte(' ')
		}
		unit /= 1000
	}
	return strings.TrimSpace(sb.String())

}

// iterative
func numberToWords(num int) string {
	if num == 0 {
		return "Zero"
	}
	sb := &strings.Builder{}
	toEnglish := func(num int) {
		if num >= 100 {
			sb.WriteString(singles[num/100])
			sb.WriteString(" Hundred ")
			num %= 100
		}
		if num >= 20 {
			sb.WriteString(tens[num/10])
			sb.WriteByte(' ')
			num %= 10
		}
		if 0 < num && num < 10 {
			sb.WriteString(singles[num])
			sb.WriteByte(' ')
		} else if num >= 10 {
			sb.WriteString(teens[num-10])
			sb.WriteByte(' ')
		}
	}
	for i, unit := 3, int(1e9); i >= 0; i-- {
		if curNum := num / unit; curNum > 0 {
			num -= curNum * unit
			toEnglish(curNum)
			sb.WriteString(thousands[i])
			sb.WriteByte(' ')
		}
		unit /= 1000
	}
	return strings.TrimSpace(sb.String())
}

// @lc code=end
