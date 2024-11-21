/*
 * @lc app=leetcode.cn id=307 lang=golang
 *
 * [307] 区域和检索 - 数组可修改
 *
 * https://leetcode-cn.com/problems/range-sum-query-mutable/description/
 *
 * algorithms
 * Medium (51.96%)
 * Likes:    364
 * Dislikes: 0
 * Total Accepted:    30.4K
 * Total Submissions: 58.5K
 * Testcase Example:  '["NumArray","sumRange","update","sumRange"]\n[[[1,3,5]],[0,2],[1,2],[0,2]]'
 *
 * 给你一个数组 nums ，请你完成两类查询。
 *
 *
 * 其中一类查询要求 更新 数组 nums 下标对应的值
 * 另一类查询要求返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 ，其中 left <= right
 *
 *
 * 实现 NumArray 类：
 *
 *
 * NumArray(int[] nums) 用整数数组 nums 初始化对象
 * void update(int index, int val) 将 nums[index] 的值 更新 为 val
 * int sumRange(int left, int right) 返回数组 nums 中索引 left 和索引 right 之间（ 包含
 * ）的nums元素的 和 （即，nums[left] + nums[left + 1], ..., nums[right]）
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：
 * ["NumArray", "sumRange", "update", "sumRange"]
 * [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
 * 输出：
 * [null, 9, null, 8]
 *
 * 解释：
 * NumArray numArray = new NumArray([1, 3, 5]);
 * numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
 * numArray.update(1, 2);   // nums = [1,2,5]
 * numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 3 * 10^4
 * -100 <= nums[i] <= 100
 * 0 <= index < nums.length
 * -100 <= val <= 100
 * 0 <= left <= right < nums.length
 * 调用 pdate 和 sumRange 方法次数不大于 3 * 10^4
 *
 *
 */

package leetcode

import "math"

// @lc code=start
type NumArray struct {
	nums, sums []int
	size       int
}

func Constructor(nums []int) NumArray {
	n := len(nums)
	size := int(math.Sqrt(float64(n)))
	sums := make([]int, (n+size-1)/size)
	for i, num := range nums {
		sums[i/size] += num
	}
	return NumArray{nums, sums, size}
}

func (na *NumArray) Update(index int, val int) {
	na.sums[index/na.size] += val - na.nums[index]
	na.nums[index] = val
}

func (na *NumArray) SumRange(left int, right int) (res int) {
	size := na.size
	b1, b2 := left/size, right/size
	if b1 == b2 {
		for i := left; i <= right; i++ {
			res += na.nums[i]
		}
		return
	}
	for i := left; i < size*(b1+1); i++ {
		res += na.nums[i]
	}
	for i := b1 + 1; i < b2; i++ {
		res += na.sums[i]
	}
	for i := b2 * size; i <= right; i++ {
		res += na.nums[i]
	}
	return
}

/**
 * Your NumArray object will be instantiated and called as such:
 * obj := Constructor(nums);
 * obj.Update(index,val);
 * param_2 := obj.SumRange(left,right);
 */
// @lc code=end
