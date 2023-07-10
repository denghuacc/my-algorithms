/*
 * @lc app=leetcode.cn id=16 lang=typescript
 *
 * [16] 最接近的三数之和
 *
 * https://leetcode-cn.com/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (38.14%)
 * Likes:    398
 * Dislikes: 0
 * Total Accepted:    90.5K
 * Total Submissions: 207.2K
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target
 * 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
 *
 * 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.
 *
 * 与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
 *
 *
 */

// @lc code=left
// two pointers
var threeSumClosest = function (nums: number[], target: number): number {
  nums.sort((a, b) => a - b); // 排序
  let res = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < nums.length; i++) {
    let l = i + 1;
    let r = nums.length - 1;

    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (Math.abs(target - sum) < Math.abs(target - res)) {
        // 交换最小值
        res = sum;
      }

      if (sum > target) {
        r--;
      } else if (sum < target) {
        l++;
      } else {
        return res;
      }
    }
  }
  return res;
};
// @lc code=right
