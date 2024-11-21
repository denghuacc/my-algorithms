/*
 * @lc app=leetcode.cn id=1707 lang=golang
 *
 * [1707] 与数组中元素的最大异或值
 *
 * https://leetcode-cn.com/problems/maximum-xor-with-an-element-from-array/description/
 *
 * algorithms
 * Hard (43.43%)
 * Likes:    53
 * Dislikes: 0
 * Total Accepted:    4.3K
 * Total Submissions: 9.4K
 * Testcase Example:  '[0,1,2,3,4]\n[[3,1],[1,3],[5,6]]'
 *
 * 给你一个由非负整数组成的数组 nums 。另有一个查询数组 queries ，其中 queries[i] = [xi, mi] 。
 *
 * 第 i 个查询的答案是 xi 和任何 nums 数组中不超过 mi 的元素按位异或（XOR）得到的最大值。换句话说，答案是 max(nums[j]
 * XOR xi) ，其中所有 j 均满足 nums[j] <= mi 。如果 nums 中的所有元素都大于 mi，最终答案就是 -1 。
 *
 * 返回一个整数数组 answer 作为查询的答案，其中 answer.length == queries.length 且 answer[i] 是第 i
 * 个查询的答案。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
 * 输出：[3,3,7]
 * 解释：
 * 1) 0 和 1 是仅有的两个不超过 1 的整数。0 XOR 3 = 3 而 1 XOR 3 = 2 。二者中的更大值是 3 。
 * 2) 1 XOR 2 = 3.
 * 3) 5 XOR 2 = 7.
 *
 *
 * 示例 2：
 *
 * 输入：nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
 * 输出：[15,-1,5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length, queries.length <= 10^5
 * queries[i].length == 2
 * 0 <= nums[j], xi, mi <= 10^9
 *
 *
 */

package leetcode

import "math"

// @lc code=start
const L = 30

type trie struct {
	children [2]*trie
	min      int
}

func (t *trie) insert(val int) {
	node := t
	if val < node.min {
		node.min = val
	}
	for i := L - 1; i >= 0; i-- {
		bit := val >> i & 1
		if node.children[bit] == nil {
			node.children[bit] = &trie{min: val}
		}
		node = node.children[bit]
		if val < node.min {
			node.min = val
		}
	}
}

func (t *trie) getMaxXorWithLimit(val, limit int) (ret int) {
	node := t
	if node.min > limit {
		return -1
	}
	for i := L - 1; i >= 0; i-- {
		bit := val >> i & 1
		if node.children[bit^1] != nil && node.children[bit^1].min <= limit {
			ret |= 1 << i
			bit ^= 1
		}
		node = node.children[bit]
	}
	return
}

func maximizeXor(nums []int, queries [][]int) []int {
	t := &trie{min: math.MaxInt32}
	for _, val := range nums {
		t.insert(val)
	}
	ret := make([]int, len(queries))
	for i, q := range queries {
		ret[i] = t.getMaxXorWithLimit(q[0], q[1])
	}
	return ret
}

// @lc code=end
