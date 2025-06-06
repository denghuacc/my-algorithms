/*
 * @lc app=leetcode.cn id=1920 lang=typescript
 *
 * [1920] 基于排列构建数组
 *
 * https://leetcode.cn/problems/build-array-from-permutation/description/
 *
 * algorithms
 * Easy (86.68%)
 * Likes:    82
 * Dislikes: 0
 * Total Accepted:    49K
 * Total Submissions: 56.3K
 * Testcase Example:  '[0,2,1,5,3,4]'
 *
 * 给你一个 从 0 开始的排列 nums（下标也从 0 开始）。请你构建一个 同样长度 的数组 ans ，其中，对于每个 i（0 <= i <
 * nums.length），都满足 ans[i] = nums[nums[i]] 。返回构建好的数组 ans 。
 *
 * 从 0 开始的排列 nums 是一个由 0 到 nums.length - 1（0 和 nums.length - 1
 * 也包含在内）的不同整数组成的数组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [0,2,1,5,3,4]
 * 输出：[0,1,2,4,5,3]
 * 解释：数组 ans 构建如下：
 * ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]],
 * nums[nums[4]], nums[nums[5]]]
 * ⁠   = [nums[0], nums[2], nums[1], nums[5], nums[3], nums[4]]
 * ⁠   = [0,1,2,4,5,3]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,0,1,2,3,4]
 * 输出：[4,5,0,1,2,3]
 * 解释：数组 ans 构建如下：
 * ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]],
 * nums[nums[4]], nums[nums[5]]]
 * ⁠   = [nums[5], nums[0], nums[1], nums[2], nums[3], nums[4]]
 * ⁠   = [4,5,0,1,2,3]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 1000
 * 0 <= nums[i] < nums.length
 * nums 中的元素 互不相同
 *
 *
 *
 *
 * 进阶：你能在不使用额外空间的情况下解决此问题吗（即 O(1) 内存）？
 *
 */

export {};

// @lc code=start
var buildArray = function (nums: number[]): number[] {
  const n = nums.length;
  const res: number[] = new Array(n).fill(0);
  for (let i = 0; i < 0; i++) {
    res[i] = nums[nums[i]];
  }
  return res;
};

var buildArray = function (nums: number[]): number[] {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    nums[i] += 1000 * (nums[nums[i]] % 1000);
  }
  for (let i = 0; i < n; i++) {
    nums[i] = Math.floor(nums[i] / 1000);
  }
  return nums;
};
// @lc code=end
