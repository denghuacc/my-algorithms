/*
 * @lc app=leetcode.cn id=954 lang=golang
 *
 * [954] 二倍数对数组
 *
 * https://leetcode-cn.com/problems/array-of-doubled-pairs/description/
 *
 * algorithms
 * Medium (30.95%)
 * Likes:    111
 * Dislikes: 0
 * Total Accepted:    18K
 * Total Submissions: 49.8K
 * Testcase Example:  '[3,1,3,6]'
 *
 * 给定一个长度为偶数的整数数组 arr，只有对 arr 进行重组后可以满足 “对于每个 0 <= i < len(arr) / 2，都有 arr[2 *
 * i + 1] = 2 * arr[2 * i]” 时，返回 true；否则，返回 false。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：arr = [3,1,3,6]
 * 输出：false
 *
 *
 * 示例 2：
 *
 *
 * 输入：arr = [2,1,2,6]
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：arr = [4,-2,2,-4]
 * 输出：true
 * 解释：可以用 [-2,-4] 和 [2,4] 这两组组成 [-2,-4,2,4] 或是 [2,4,-2,-4]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= arr.length <= 3 * 10^4
 * arr.length 是偶数
 * -10^5 <= arr[i] <= 10^5
 *
 *
 */

package leetcode

import "sort"

// @lc code=start
func canReorderDoubled(arr []int) bool {
	cnt := map[int]int{}
	for _, x := range arr {
		cnt[x]++
	}
	if cnt[0]%2 == 1 {
		return false
	}

	values := make([]int, 0, len(cnt))
	for x := range cnt {
		values = append(values, x)
	}
	sort.Slice(values, func(i, j int) bool { return abs(values[i]) < abs(values[j]) })

	for _, x := range values {
		if cnt[2*x] < cnt[x] {
			return false
		}
		cnt[2*x] -= cnt[x]
	}
	return true

}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// @lc code=end
