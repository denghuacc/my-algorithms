/*
 * @lc app=leetcode.cn id=2708 lang=typescript
 *
 * [2708] 一个小组的最大实力值
 *
 * https://leetcode.cn/problems/maximum-strength-of-a-group/description/
 *
 * algorithms
 * Medium (31.02%)
 * Likes:    38
 * Dislikes: 0
 * Total Accepted:    11.9K
 * Total Submissions: 35.7K
 * Testcase Example:  '[3,-1,-5,2,5,-9]'
 *
 * 给你一个下标从 0 开始的整数数组 nums ，它表示一个班级中所有学生在一次考试中的成绩。老师想选出一部分同学组成一个 非空 小组，且这个小组的
 * 实力值 最大，如果这个小组里的学生下标为 i0, i1, i2, ... , ik ，那么这个小组的实力值定义为 nums[i0] * nums[i1]
 * * nums[i2] * ... * nums[ik​] 。
 *
 * 请你返回老师创建的小组能得到的最大实力值为多少。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [3,-1,-5,2,5,-9]
 * 输出：1350
 * 解释：一种构成最大实力值小组的方案是选择下标为 [0,2,3,4,5] 的学生。实力值为 3 * (-5) * 2 * 5 * (-9) = 1350
 * ，这是可以得到的最大实力值。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [-4,-5,-4]
 * 输出：20
 * 解释：选择下标为 [0, 1] 的学生。得到的实力值为 20 。我们没法得到更大的实力值。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 13
 * -9 <= nums[i] <= 9
 *
 *
 */

// @lc code=start
var maxStrength = function (nums: number[]): number {
  if (nums.length === 1) return nums[0];
  let negativeCount = 0;
  let positiveCount = 0;
  let maxNegative = -Infinity;
  let res = 1;
  for (const num of nums) {
    if (num < 0) {
      negativeCount++;
      res *= num;
      maxNegative = Math.max(maxNegative, num);
    } else if (num > 0) {
      positiveCount++;
      res *= num;
    }
  }

  if (negativeCount <= 1 && positiveCount === 0) {
    return 0;
  }
  return res < 0 ? res / maxNegative : res;
};

// 只有一个数时最大值是它本身
// 负负得正
// 最大负数的绝对值是最小的，多个负数相乘时为负数要除以它（去掉）得最大值
// 零比所有的负数大

var maxStrength = function (nums: number[]): number {
  if (nums.length === 1) return nums[0];
  const negatives = [];
  const positives = [];
  let maxNegative = -Infinity;
  for (const num of nums) {
    if (num < 0) {
      negatives.push(num);
      maxNegative = Math.max(maxNegative, num);
    } else if (num > 0) {
      positives.push(num);
    }
  }
  if (negatives.length <= 1 && positives.length === 0) {
    return 0;
  }
  let res = 1;
  if (negatives.length > 0) {
    res *= getProduct(negatives);
  }
  if (positives.length > 0) {
    res *= getProduct(positives);
  }
  return res < 0 ? res / maxNegative : res;

  function getProduct(arr: number[]): number {
    let res = 1;
    for (const num of arr) {
      res *= num;
    }
    return res;
  }
};
// @lc code=end
