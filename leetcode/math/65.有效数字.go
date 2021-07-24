/*
 * @lc app=leetcode.cn id=65 lang=golang
 *
 * [65] 有效数字
 *
 * https://leetcode-cn.com/problems/valid-number/description/
 *
 * algorithms
 * Hard (25.83%)
 * Likes:    244
 * Dislikes: 0
 * Total Accepted:    39.1K
 * Total Submissions: 151.3K
 * Testcase Example:  '"0"'
 *
 * 有效数字（按顺序）可以分成以下几个部分：
 *
 *
 * 一个 小数 或者 整数
 * （可选）一个 'e' 或 'E' ，后面跟着一个 整数
 *
 *
 * 小数（按顺序）可以分成以下几个部分：
 *
 *
 * （可选）一个符号字符（'+' 或 '-'）
 * 下述格式之一：
 *
 * 至少一位数字，后面跟着一个点 '.'
 * 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
 * 一个点 '.' ，后面跟着至少一位数字
 *
 *
 *
 *
 * 整数（按顺序）可以分成以下几个部分：
 *
 *
 * （可选）一个符号字符（'+' 或 '-'）
 * 至少一位数字
 *
 *
 * 部分有效数字列举如下：
 *
 *
 * ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7",
 * "+6e-1", "53.5e93", "-123.456e789"]
 *
 *
 * 部分无效数字列举如下：
 *
 *
 * ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]
 *
 *
 * 给你一个字符串 s ，如果 s 是一个 有效数字 ，请返回 true 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "0"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "e"
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "."
 * 输出：false
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = ".1"
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 仅含英文字母（大写和小写），数字（0-9），加号 '+' ，减号 '-' ，或者点 '.' 。
 *
 *
 */

package leetcode

// @lc code=start
type State int
type CharType int

const (
	STATE_INITIAL State = iota
	STATE_INT_SIGN
	STATE_INTEGER
	STATE_POINT
	STATE_POINT_WITHOUT_INT
	STATE_FRACTION
	STATE_EXP
	STATE_EXP_SIGN
	STATE_EXP_NUMBER
	STATE_END
)

const (
	CHAR_NUMBER CharType = iota
	CHAR_EXP
	CHAR_POINT
	CHAR_SIGN
	CHAR_ILLEGAL
)

func toCharType(ch byte) CharType {
	switch ch {
	case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
		return CHAR_NUMBER
	case 'e', 'E':
		return CHAR_EXP
	case '.':
		return CHAR_POINT
	case '+', '-':
		return CHAR_SIGN
	default:
		return CHAR_ILLEGAL
	}
}

func isNumber(s string) bool {
	transfer := map[State]map[CharType]State{
		STATE_INITIAL: map[CharType]State{
			CHAR_NUMBER: STATE_INTEGER,
			CHAR_POINT:  STATE_POINT_WITHOUT_INT,
			CHAR_SIGN:   STATE_INT_SIGN,
		},
		STATE_INT_SIGN: map[CharType]State{
			CHAR_NUMBER: STATE_INTEGER,
			CHAR_POINT:  STATE_POINT_WITHOUT_INT,
		},
		STATE_INTEGER: map[CharType]State{
			CHAR_NUMBER: STATE_INTEGER,
			CHAR_EXP:    STATE_EXP,
			CHAR_POINT:  STATE_POINT,
		},
		STATE_POINT: map[CharType]State{
			CHAR_NUMBER: STATE_FRACTION,
			CHAR_EXP:    STATE_EXP,
		},
		STATE_POINT_WITHOUT_INT: map[CharType]State{
			CHAR_NUMBER: STATE_FRACTION,
		},
		STATE_FRACTION: map[CharType]State{
			CHAR_NUMBER: STATE_FRACTION,
			CHAR_EXP:    STATE_EXP,
		},
		STATE_EXP: map[CharType]State{
			CHAR_NUMBER: STATE_EXP_NUMBER,
			CHAR_SIGN:   STATE_EXP_SIGN,
		},
		STATE_EXP_SIGN: map[CharType]State{
			CHAR_NUMBER: STATE_EXP_NUMBER,
		},
		STATE_EXP_NUMBER: map[CharType]State{
			CHAR_NUMBER: STATE_EXP_NUMBER,
		},
	}
	state := STATE_INITIAL
	for i := 0; i < len(s); i++ {
		typ := toCharType(s[i])
		if _, ok := transfer[state][typ]; !ok {
			return false
		} else {
			state = transfer[state][typ]
		}
	}
	return state == STATE_INTEGER || state == STATE_POINT || state == STATE_FRACTION || state == STATE_EXP_NUMBER || state == STATE_END
}

// @lc code=end
