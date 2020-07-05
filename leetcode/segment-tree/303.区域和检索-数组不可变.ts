/*
 * @lc app=leetcode.cn id=303 lang=typescript
 *
 * [303] 区域和检索 - 数组不可变
 *
 * https://leetcode-cn.com/problems/range-sum-query-immutable/description/
 *
 * algorithms
 * Easy (50.79%)
 * Total Accepted:    9.4K
 * Total Submissions: 18K
 * Testcase Example:  '["NumArray","sumRange","sumRange","sumRange"]\n[[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]'
 *
 * 给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。
 *
 * 示例：
 *
 * 给定 nums = [-2, 0, 3, -5, 2, -1]，求和函数为 sumRange()
 *
 * sumRange(0, 2) -> 1
 * sumRange(2, 5) -> -1
 * sumRange(0, 5) -> -3
 *
 * 说明:
 *
 *
 * 你可以假设数组不可变。
 * 会多次调用 sumRange 方法。
 *
 *
 */

// @lc code=start
// dp
class NumArray {
  sum: number[];

  // sum[i] 存储前 i 个元素和，sum[0] = 0
  // sum[i] 存储 nums[0...i-1] 的和
  constructor(nums: number[]) {
    this.sum = [];
    this.sum[0] = 0;
    for (let i = 1; i < nums.length + 1; i++) {
      this.sum[i] = this.sum[i - 1] + nums[i - 1];
    }
  }

  sumRange(i: number, j: number): number {
    return this.sum[j + 1] - this.sum[i];
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
// @lc code=end
