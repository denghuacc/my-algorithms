/*
 * @lc app=leetcode.cn id=592 lang=golang
 *
 * [592] 分数加减运算
 *
 * https://leetcode.cn/problems/fraction-addition-and-subtraction/description/
 *
 * algorithms
 * Medium (52.88%)
 * Likes:    84
 * Dislikes: 0
 * Total Accepted:    9.7K
 * Total Submissions: 16.8K
 * Testcase Example:  '"-1/2+1/2"'
 *
 * 给定一个表示分数加减运算的字符串 expression ，你需要返回一个字符串形式的计算结果。
 *
 * 这个结果应该是不可约分的分数，即最简分数。 如果最终结果是一个整数，例如 2，你需要将它转换成分数形式，其分母为 1。所以在上述例子中, 2
 * 应该被转换为 2/1。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: expression = "-1/2+1/2"
 * 输出: "0/1"
 *
 *
 * 示例 2:
 *
 *
 * 输入: expression = "-1/2+1/2+1/3"
 * 输出: "1/3"
 *
 *
 * 示例 3:
 *
 *
 * 输入: expression = "1/3-1/2"
 * 输出: "-1/6"
 *
 *
 *
 *
 * 提示:
 *
 *
 * 输入和输出字符串只包含 '0' 到 '9' 的数字，以及 '/', '+' 和 '-'。
 * 输入和输出分数格式均为 ±分子/分母。如果输入的第一个分数或者输出的分数是正数，则 '+' 会被省略掉。
 * 输入只包含合法的最简分数，每个分数的分子与分母的范围是  [1,10]。 如果分母是1，意味着这个分数实际上是一个整数。
 * 输入的分数个数范围是 [1,10]。
 * 最终结果的分子与分母保证是 32 位整数范围内的有效整数。
 *
 *
 */

package leetcode

import (
	"fmt"
	"unicode"
)

// @lc code=start
func fractionAddition(expression string) string {
	numerator, denominator := 0, 1
	idx, n := 0, len(expression)
	for idx < n {
		numerator1, sign := 0, 1
		if expression[idx] == '-' || expression[idx] == '+' {
			if expression[idx] == '-' {
				sign = -1
			}
			idx++
		}
		for idx < n && unicode.IsDigit(rune(expression[idx])) {
			numerator1 = numerator1*10 + int(expression[idx]-'0')
			idx++
		}
		numerator1 = sign * numerator1
		idx++

		denominator1 := 0
		for idx < n && unicode.IsDigit(rune(expression[idx])) {
			denominator1 = denominator1*10 + int(expression[idx]-'0')
			idx++
		}

		numerator = numerator*denominator1 + numerator1*denominator
		denominator *= denominator1
	}
	if numerator == 0 {
		return "0/1"
	}
	gcd := getGcd(abs(numerator), denominator)
	return fmt.Sprintf("%d/%d", numerator/gcd, denominator/gcd)
}

func getGcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

// @lc code=end
