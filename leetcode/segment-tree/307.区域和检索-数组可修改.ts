/*
 * @lc app=leetcode.cn id=307 lang=typescript
 *
 * [307] 区域和检索 - 数组可修改
 *
 * https://leetcode-cn.com/problems/range-sum-query-mutable/description/
 *
 * algorithms
 * Medium (47.22%)
 * Total Accepted:    2.1K
 * Total Submissions: 4.2K
 * Testcase Example:  '["NumArray","sumRange","update","sumRange"]\n[[[1,3,5]],[0,2],[1,2],[0,2]]'
 *
 * 给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。
 *
 * update(i, val) 函数可以通过将下标为 i 的数值更新为 val，从而对数列进行修改。
 *
 * 示例:
 *
 * Given nums = [1, 3, 5]
 *
 * sumRange(0, 2) -> 9
 * update(1, 2)
 * sumRange(0, 2) -> 8
 *
 *
 * 说明:
 *
 *
 * 数组仅可以在 update 函数下进行修改。
 * 你可以假设 update 函数与 sumRange 函数的调用次数是均匀分布的。
 *
 *
 */

export {};

// @lc code=start
// dp
class NumArray {
  data: number[];
  sum: number[];

  // sum[i] 存储前 i 个元素和，sum[0] = 0
  // sum[i] 存储 nums[0...i-1] 的和
  constructor(nums: number[]) {
    this.data = nums; // 拷贝
    this.sum = [];
    this.sum[0] = 0;
    for (let i = 1; i < nums.length + 1; i++) {
      this.sum[i] = this.sum[i - 1] + nums[i - 1];
    }
  }

  update(i: number, val: number): void {
    this.data[i] = val;
    for (let i = 1; i < this.data.length + 1; i++) {
      this.sum[i] = this.sum[i - 1] + this.data[i - 1];
    }
  }

  sumRange(i: number, j: number): number {
    return this.sum[j + 1] - this.sum[i];
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */
// @lc code=end
