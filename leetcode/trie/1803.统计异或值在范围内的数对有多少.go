/*
 * @lc app=leetcode.cn id=1803 lang=golang
 *
 * [1803] 统计异或值在范围内的数对有多少
 *
 * https://leetcode.cn/problems/count-pairs-with-xor-in-a-range/description/
 *
 * algorithms
 * Hard (43.37%)
 * Likes:    79
 * Dislikes: 0
 * Total Accepted:    4.9K
 * Total Submissions: 10.1K
 * Testcase Example:  '[1,4,2,7]\n2\n6'
 *
 * 给你一个整数数组 nums （下标 从 0 开始 计数）以及两个整数：low 和 high ，请返回 漂亮数对 的数目。
 *
 * 漂亮数对 是一个形如 (i, j) 的数对，其中 0 <= i < j < nums.length 且 low <= (nums[i] XOR
 * nums[j]) <= high 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,4,2,7], low = 2, high = 6
 * 输出：6
 * 解释：所有漂亮数对 (i, j) 列出如下：
 * ⁠   - (0, 1): nums[0] XOR nums[1] = 5
 * ⁠   - (0, 2): nums[0] XOR nums[2] = 3
 * ⁠   - (0, 3): nums[0] XOR nums[3] = 6
 * ⁠   - (1, 2): nums[1] XOR nums[2] = 6
 * ⁠   - (1, 3): nums[1] XOR nums[3] = 3
 * ⁠   - (2, 3): nums[2] XOR nums[3] = 5
 *
 *
 * 示例 2：
 *
 * 输入：nums = [9,8,4,2,1], low = 5, high = 14
 * 输出：8
 * 解释：所有漂亮数对 (i, j) 列出如下：
 * ​​​​​    - (0, 2): nums[0] XOR nums[2] = 13
 * - (0, 3): nums[0] XOR nums[3] = 11
 * - (0, 4): nums[0] XOR nums[4] = 8
 * - (1, 2): nums[1] XOR nums[2] = 12
 * - (1, 3): nums[1] XOR nums[3] = 10
 * - (1, 4): nums[1] XOR nums[4] = 9
 * - (2, 3): nums[2] XOR nums[3] = 6
 * - (2, 4): nums[2] XOR nums[4] = 5
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2 * 10^4
 * 1 <= nums[i] <= 2 * 10^4
 * 1 <= low <= high <= 2 * 10^4
 *
 *
 */

package leetcode

// @lc code=start
type Trie struct {
	son [2]*Trie
	sum int
}

func countPairs(nums []int, low int, high int) int {
	const HighBit = 14
	var f func(nums []int, x int) int
	f = func(nums []int, x int) (res int) {
		root := &Trie{son: [2]*Trie{}, sum: 0}
		var add func(int)
		add = func(num int) {
			cur := root
			for k := HighBit; k >= 0; k-- {
				bit := (num >> k) & 1
				if cur.son[bit] == nil {
					cur.son[bit] = &Trie{son: [2]*Trie{}, sum: 0}
				}
				cur = cur.son[bit]
				cur.sum++
			}
		}
		var get func(int, int) int
		get = func(num, x int) (sum int) {
			cur := root
			for k := HighBit; k >= 0; k-- {
				r := (num >> k) & 1
				if ((x >> k) & 1) != 0 {
					if cur.son[r] != nil {
						sum += cur.son[r].sum
					}
					if cur.son[r^1] == nil {
						return
					}
					cur = cur.son[r^1]
				} else {
					if cur.son[r] == nil {
						return
					}
					cur = cur.son[r]
				}
			}
			sum += cur.sum
			return
		}
		for i := 1; i < len(nums); i++ {
			add(nums[i-1])
			res += get(nums[i], x)
		}
		return
	}
	return f(nums, high) - f(nums, low-1)
}

// @lc code=end
