/*
 * @lc app=leetcode.cn id=398 lang=typescript
 *
 * [398] 随机数索引
 *
 * https://leetcode-cn.com/problems/random-pick-index/description/
 *
 * algorithms
 * Medium (49.64%)
 * Likes:    65
 * Dislikes: 0
 * Total Accepted:    5.9K
 * Total Submissions: 9.5K
 * Testcase Example:  '["Solution","pick"]\n[[[1,2,3,3,3]],[3]]'
 *
 * 给定一个可能含有重复元素的整数数组，要求随机输出给定的数字的索引。 您可以假设给定的数字一定存在于数组中。
 *
 * 注意：
 * 数组大小可能非常大。 使用太多额外空间的解决方案将不会通过测试。
 *
 * 示例:
 *
 *
 * int[] nums = new int[] {1,2,3,3,3};
 * Solution solution = new Solution(nums);
 *
 * // pick(3) 应该返回索引 2,3 或者 4。每个索引的返回概率应该相等。
 * solution.pick(3);
 *
 * // pick(1) 应该返回 0。因为只有nums[0]等于1。
 * solution.pick(1);
 *
 *
 */

// @lc code=start
// design
class Solution {
  nums: number[];

  constructor(nums: number[]) {
    this.nums = nums;
  }

  // pick(target: number): number {
  //   const items: number[] = [];
  //   for (let i = 0; i < this.nums.length; i++) {
  //     if (target === this.nums[i]) {
  //       items.push(i);
  //     }
  //   }
  //   const randIdx = Math.floor(Math.random() * items.length);
  //   return items[randIdx];
  // }

  pick(target: number): number {
    let res = 0;
    let cnt = 0;
    for (let i = 0; i < this.nums.length; i++) {
      if (target === this.nums[i]) {
        cnt++;
        if (Math.floor(Math.random() * cnt) === 0) {
          res = i;
        }
      }
    }
    return res;
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
// @lc code=end
