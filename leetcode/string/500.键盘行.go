/*
 * @lc app=leetcode.cn id=500 lang=golang
 *
 * [500] 键盘行
 *
 * https://leetcode-cn.com/problems/keyboard-row/description/
 *
 * algorithms
 * Easy (70.97%)
 * Likes:    147
 * Dislikes: 0
 * Total Accepted:    33.6K
 * Total Submissions: 46.9K
 * Testcase Example:  '["Hello","Alaska","Dad","Peace"]'
 *
 * 给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词。键盘如下图所示。
 *
 * 美式键盘 中：
 *
 *
 * 第一行由字符 "qwertyuiop" 组成。
 * 第二行由字符 "asdfghjkl" 组成。
 * 第三行由字符 "zxcvbnm" 组成。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：words = ["Hello","Alaska","Dad","Peace"]
 * 输出：["Alaska","Dad"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：words = ["omk"]
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：words = ["adsdf","sfd"]
 * 输出：["adsdf","sfd"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * words[i] 由英文字母（小写和大写字母）组成
 *
 *
 */

package leetcode

import "strings"

// @lc code=start
func findWords(words []string) (ret []string) {
	var hasInclude func(row, word string) bool
	hasInclude = func(row, word string) bool {
		charArr := []byte(word)
		for _, char := range charArr {
			if !strings.Contains(row, strings.ToLower(string(char))) {
				return false
			}
		}
		return true
	}

	var hasIncludeOneOfRow func(word string) bool
	hasIncludeOneOfRow = func(word string) bool {
		rows := []string{"qwertyuiop", "asdfghjkl", "zxcvbnm"}
		for _, row := range rows {
			if hasInclude(row, word) {
				return true
			}
		}
		return false
	}

	for _, word := range words {
		if hasIncludeOneOfRow(word) {
			ret = append(ret, word)
		}
	}
	return
}

// @lc code=end
