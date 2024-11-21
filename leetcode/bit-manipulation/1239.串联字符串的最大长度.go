/*
 * @lc app=leetcode.cn id=1239 lang=golang
 *
 * [1239] 串联字符串的最大长度
 *
 * https://leetcode-cn.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/description/
 *
 * algorithms
 * Medium (41.38%)
 * Likes:    116
 * Dislikes: 0
 * Total Accepted:    20K
 * Total Submissions: 45.5K
 * Testcase Example:  '["un","iq","ue"]'
 *
 * 给定一个字符串数组 arr，字符串 s 是将 arr 某一子序列字符串连接所得的字符串，如果 s 中的每一个字符都只出现过一次，那么它就是一个可行解。
 *
 * 请返回所有可行解 s 中最长长度。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = ["un","iq","ue"]
 * 输出：4
 * 解释：所有可能的串联组合是 "","un","iq","ue","uniq" 和 "ique"，最大长度为 4。
 *
 *
 * 示例 2：
 *
 * 输入：arr = ["cha","r","act","ers"]
 * 输出：6
 * 解释：可能的解答有 "chaers" 和 "acters"。
 *
 *
 * 示例 3：
 *
 * 输入：arr = ["abcdefghijklmnopqrstuvwxyz"]
 * 输出：26
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 16
 * 1 <= arr[i].length <= 26
 * arr[i] 中只含有小写英文字母
 *
 *
 */

package leetcode

import "math/bits"

// @lc code=start
func maxLength(arr []string) int {
	ret := 0
	masks := []int{}
outer:
	for _, s := range arr {
		mask := 0
		for _, ch := range s {
			ch -= 'a'
			if mask>>ch&1 > 0 {
				continue outer
			}
			mask |= 1 << ch
		}
		masks = append(masks, mask)
	}
	var backtrack func(pos, mask int)
	backtrack = func(pos, mask int) {
		if pos == len(masks) {
			ret = max(ret, bits.OnesCount(uint(mask)))
			return
		}
		if mask&masks[pos] == 0 {
			backtrack(pos+1, mask|masks[pos])
		}
		backtrack(pos+1, mask)
	}
	backtrack(0, 0)
	return ret
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

// @lc code=end
