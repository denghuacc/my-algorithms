/*
 * @lc app=leetcode.cn id=442 lang=typescript
 *
 * [442] 数组中重复的数据
 *
 * https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/description/
 *
 * algorithms
 * Medium (70.48%)
 * Likes:    502
 * Dislikes: 0
 * Total Accepted:    58.1K
 * Total Submissions: 81.6K
 * Testcase Example:  '[4,3,2,7,8,2,3,1]'
 *
 * 给你一个长度为 n 的整数数组 nums ，其中 nums 的所有整数都在范围 [1, n] 内，且每个整数出现 一次 或 两次 。请你找出所有出现
 * 两次 的整数，并以数组形式返回。
 *
 * 你必须设计并实现一个时间复杂度为 O(n) 且仅使用常量额外空间的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,3,2,7,8,2,3,1]
 * 输出：[2,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,1,2]
 * 输出：[1]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1]
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 1 <= n <= 10^5
 * 1 <= nums[i] <= n
 * nums 中的每个元素出现 一次 或 两次
 *
 *
 */

// @lc code=start
// set
var findDuplicates = function (nums: number[]): number[] {
  const res: number[] = [];
  const numsSet = new Set(nums);
  for (const num of nums) {
    if (numsSet.has(num)) {
      numsSet.delete(num);
    } else {
      res.push(num);
    }
  }
  return res;
};

// sort
var findDuplicates = function (nums: number[]): number[] {
  nums.sort((a, b) => a - b);
  const res: number[] = [];
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      res.push(nums[i]);
    }
  }
  return res;
};

// mark num ✅
var findDuplicates = function (nums: number[]): number[] {
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const num = Math.abs(nums[i]);
    if (nums[num - 1] < 0) {
      res.push(num);
    } else {
      nums[num - 1] = -nums[num - 1];
    }
  }
  return res;
};

// @lc code=end
