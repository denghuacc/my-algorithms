/*
 * @lc app=leetcode.cn id=1787 lang=golang
 *
 * [1787] 使所有区间的异或结果为零
 *
 * https://leetcode-cn.com/problems/make-the-xor-of-all-segments-equal-to-zero/description/
 *
 * algorithms
 * Hard (58.06%)
 * Likes:    54
 * Dislikes: 0
 * Total Accepted:    3.2K
 * Total Submissions: 5.5K
 * Testcase Example:  '[1,2,0,3,0]\n1'
 *
 * 给你一个整数数组 nums​​​ 和一个整数 k​​​​​ 。区间 [left, right]（left ）的 异或结果 是对下标位于 left 和
 * right（包括 left 和 right ）之间所有元素进行 XOR 运算的结果：nums[left] XOR nums[left+1] XOR
 * ... XOR nums[right] 。
 *
 * 返回数组中 要更改的最小元素数 ，以使所有长度为 k 的区间异或结果等于零。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,0,3,0], k = 1
 * 输出：3
 * 解释：将数组 [1,2,0,3,0] 修改为 [0,0,0,0,0]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,4,5,2,1,7,3,4,7], k = 3
 * 输出：3
 * 解释：将数组 [3,4,5,2,1,7,3,4,7] 修改为 [3,4,7,3,4,7,3,4,7]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,2,4,1,2,5,1,2,6], k = 3
 * 输出：3
 * 解释：将数组[1,2,4,1,2,5,1,2,6] 修改为 [1,2,3,1,2,3,1,2,3]
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * ​​​​​​0
 *
 *
 */

package leetcode

import "math"

// @lc code=start
// dp
func minChanges(nums []int, k int) int {
	const maxX = 1 << 10
	const inf = math.MaxInt32 / 2

	n := len(nums)
	f := make([]int, maxX)
	for i := range f {
		f[i] = inf
	}

	f[0] = 0

	for i := 0; i < k; i++ {
		cnt := map[int]int{}
		size := 0
		for j := i; j < n; j += k {
			cnt[nums[j]]++
			size++
		}

		t2min := min(f...)

		g := make([]int, maxX)
		for j := range g {
			g[j] = t2min
		}
		for mask := range g {
			for x, cntX := range cnt {
				g[mask] = min(g[mask], f[mask^x]-cntX)
			}
		}

		for j := range g {
			g[j] += size
		}

		f = g
	}

	return f[0]
}

func min(arr ...int) int {
	ret := arr[0]
	for _, val := range arr[1:] {
		if val < ret {
			ret = val
		}
	}

	return ret
}

// @lc code=end
