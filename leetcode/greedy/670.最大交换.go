/*
 * @lc app=leetcode.cn id=670 lang=golang
 *
 * [670] 最大交换
 *
 * https://leetcode.cn/problems/maximum-swap/description/
 *
 * algorithms
 * Medium (47.17%)
 * Likes:    296
 * Dislikes: 0
 * Total Accepted:    37.6K
 * Total Submissions: 79.8K
 * Testcase Example:  '2736'
 *
 * 给定一个非负整数，你至多可以交换一次数字中的任意两位。返回你能得到的最大值。
 *
 * 示例 1 :
 *
 *
 * 输入: 2736
 * 输出: 7236
 * 解释: 交换数字2和数字7。
 *
 *
 * 示例 2 :
 *
 *
 * 输入: 9973
 * 输出: 9973
 * 解释: 不需要交换。
 *
 *
 * 注意:
 *
 *
 * 给定数字的范围是 [0, 10^8]
 *
 *
 */

package leetcode

import "strconv"

// @lc code=start
func maximumSwap(num int) int {
	numStrArr := []byte(strconv.Itoa(num))
	n := len(numStrArr)
	maxIdx, idx1, idx2 := n-1, -1, -1
	for i := n - 1; i >= 0; i-- {
		if numStrArr[i] > numStrArr[maxIdx] {
			maxIdx = i
		} else if numStrArr[i] < numStrArr[maxIdx] {
			idx1, idx2 = i, maxIdx
		}
	}
	if idx1 < 0 {
		return num
	}
	numStrArr[idx1], numStrArr[idx2] = numStrArr[idx2], numStrArr[idx1]
	v, _ := strconv.Atoi(string(numStrArr))
	return v
}

// @lc code=end
