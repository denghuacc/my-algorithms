/*
 * @lc app=leetcode.cn id=1157 lang=golang
 *
 * [1157] 子数组中占绝大多数的元素
 *
 * https://leetcode.cn/problems/online-majority-element-in-subarray/description/
 *
 * algorithms
 * Hard (36.34%)
 * Likes:    110
 * Dislikes: 0
 * Total Accepted:    8K
 * Total Submissions: 19.1K
 * Testcase Example:  '["MajorityChecker","query","query","query"]\n' +
  '[[[1,1,2,2,1,1]],[0,5,4],[0,3,3],[2,3,2]]'
 *
 * 设计一个数据结构，有效地找到给定子数组的 多数元素 。
 *
 * 子数组的 多数元素 是在子数组中出现 threshold 次数或次数以上的元素。
 *
 * 实现 MajorityChecker 类:
 *
 *
 * MajorityChecker(int[] arr) 会用给定的数组 arr 对 MajorityChecker 初始化。
 * int query(int left, int right, int threshold) 返回子数组中的元素  arr[left...right]
 * 至少出现 threshold 次数，如果不存在这样的元素则返回 -1。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入:
 * ["MajorityChecker", "query", "query", "query"]
 * [[[1, 1, 2, 2, 1, 1]], [0, 5, 4], [0, 3, 3], [2, 3, 2]]
 * 输出：
 * [null, 1, -1, 2]
 *
 * 解释：
 * MajorityChecker majorityChecker = new MajorityChecker([1,1,2,2,1,1]);
 * majorityChecker.query(0,5,4); // 返回 1
 * majorityChecker.query(0,3,3); // 返回 -1
 * majorityChecker.query(2,3,2); // 返回 2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 2 * 10^4
 * 1 <= arr[i] <= 2 * 10^4
 * 0 <= left <= right < arr.length
 * threshold <= right - left + 1
 * 2 * threshold > right - left + 1
 * 调用 query 的次数最多为 10^4
 *
 *
*/

package leetcode

import (
	"math/rand"
	"sort"
	"time"
)

// @lc code=start
type MajorityChecker struct {
	arr []int
	loc map[int][]int
}

func Constructor(arr []int) MajorityChecker {
	rand.Seed(time.Now().UnixNano())
	loc := make(map[int][]int)
	for i, x := range arr {
		loc[x] = append(loc[x], i)
	}
	return MajorityChecker{arr, loc}

}

func (mc *MajorityChecker) Query(left int, right int, threshold int) int {
	length := right - left + 1
	for i := 0; i < 20; i++ {
		x := mc.arr[left+rand.Intn(right-left+1)]
		pos := mc.loc[x]
		occ := sort.SearchInts(pos, right+1) - sort.SearchInts(pos, left)
		if occ >= threshold {
			return x
		}
		if occ*2 >= length {
			break
		}
	}
	return -1
}

/**
 * Your MajorityChecker object will be instantiated and called as such:
 * obj := Constructor(arr);
 * param_1 := obj.Query(left,right,threshold);
 */
// @lc code=end
