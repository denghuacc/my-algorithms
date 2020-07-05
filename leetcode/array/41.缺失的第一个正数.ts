/*
 * @lc app=leetcode.cn id=41 lang=typescript
 *
 * [41] 缺失的第一个正数
 *
 * https://leetcode-cn.com/problems/first-missing-positive/description/
 *
 * algorithms
 * Hard (35.66%)
 * Likes:    549
 * Dislikes: 0
 * Total Accepted:    55.7K
 * Total Submissions: 145K
 * Testcase Example:  '[1,2,0]'
 *
 * 给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。
 *
 *
 *
 * 示例 1:
 *
 * 输入: [1,2,0]
 * 输出: 3
 *
 *
 * 示例 2:
 *
 * 输入: [3,4,-1,1]
 * 输出: 2
 *
 *
 * 示例 3:
 *
 * 输入: [7,8,9,11,12]
 * 输出: 1
 *
 *
 *
 *
 * 提示：
 *
 * 你的算法的时间复杂度应为O(n)，并且只能使用常数级别的额外空间。
 *
 */

// @lc code=start
var firstMissingPositive = function (nums: number[]): number {
  let n = nums.length;

  let contains = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      contains++;
      break;
    }
  }

  if (contains === 0) return 1;
  if (n === 1) return 2; // nums = [1]

  // 用 1 替换负数和零
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0 || nums[i] > n) {
      nums[i] = 1;
    }
  }

  // 使用索引和数字符号作为检查器
  for (let i = 0; i < n; i++) {
    let a = Math.abs(nums[i]);
    if (a === n) {
      nums[0] = -Math.abs(nums[0]);
    } else {
      nums[a] = -Math.abs(nums[a]);
    }
  }

  // 现在第一个正数的下标，就是第一个缺失的数
  for (let i = 1; i < n; i++) {
    if (nums[i] > 0) return i;
  }

  if (nums[0] > 0) return n;

  return n + 1;
};
// @lc code=end
