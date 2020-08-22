/*
 * @lc app=leetcode.cn id=384 lang=typescript
 *
 * [384] 打乱数组
 *
 * https://leetcode-cn.com/problems/shuffle-an-array/description/
 *
 * algorithms
 * Medium (42.95%)
 * Likes:    79
 * Dislikes: 0
 * Total Accepted:    22.2K
 * Total Submissions: 42.5K
 * Testcase Example:  '["Solution","shuffle","reset","shuffle"]\n[[[1,2,3]],[],[],[]]'
 *
 * 打乱一个没有重复元素的数组。
 *
 *
 *
 * 示例:
 *
 * // 以数字集合 1, 2 和 3 初始化数组。
 * int[] nums = {1,2,3};
 * Solution solution = new Solution(nums);
 *
 * // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
 * solution.shuffle();
 *
 * // 重设数组到它的初始状态[1,2,3]。
 * solution.reset();
 *
 * // 随机返回数组[1,2,3]打乱后的结果。
 * solution.shuffle();
 *
 *
 */

export {};

// @lc code=start
// design
class Solution {
  array: number[];
  constructor(nums: number[]) {
    this.array = nums;
  }

  reset(): number[] {
    return this.array;
  }

  shuffle(): number[] {
    const copyArr = this.array.slice();
    const n = copyArr.length;
    for (let i = 0; i < n; i++) {
      const randomIndex = this.randomRange(n);
      this.swap(copyArr, i, randomIndex);
    }
    return copyArr;
  }

  // random range [0, max)
  private randomRange(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private swap(arr: number[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
// @lc code=end
