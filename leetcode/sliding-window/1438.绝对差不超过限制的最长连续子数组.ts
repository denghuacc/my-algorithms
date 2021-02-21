/*
 * @lc app=leetcode.cn id=1438 lang=typescript
 *
 * [1438] 绝对差不超过限制的最长连续子数组
 *
 * https://leetcode-cn.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/description/
 *
 * algorithms
 * Medium (40.61%)
 * Likes:    93
 * Dislikes: 0
 * Total Accepted:    9.3K
 * Total Submissions: 23K
 * Testcase Example:  '[8,2,4,7]\n4'
 *
 * 给你一个整数数组 nums ，和一个表示限制的整数 limit，请你返回最长连续子数组的长度，该子数组中的任意两个元素之间的绝对差必须小于或者等于
 * limit 。
 *
 * 如果不存在满足条件的子数组，则返回 0 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [8,2,4,7], limit = 4
 * 输出：2
 * 解释：所有子数组如下：
 * [8] 最大绝对差 |8-8| = 0 <= 4.
 * [8,2] 最大绝对差 |8-2| = 6 > 4.
 * [8,2,4] 最大绝对差 |8-2| = 6 > 4.
 * [8,2,4,7] 最大绝对差 |8-2| = 6 > 4.
 * [2] 最大绝对差 |2-2| = 0 <= 4.
 * [2,4] 最大绝对差 |2-4| = 2 <= 4.
 * [2,4,7] 最大绝对差 |2-7| = 5 > 4.
 * [4] 最大绝对差 |4-4| = 0 <= 4.
 * [4,7] 最大绝对差 |4-7| = 3 <= 4.
 * [7] 最大绝对差 |7-7| = 0 <= 4.
 * 因此，满足题意的最长子数组的长度为 2 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [10,1,2,4,7,2], limit = 5
 * 输出：4
 * 解释：满足题意的最长子数组是 [2,4,7,2]，其最大绝对差 |2-7| = 5 <= 5 。
 *
 *
 * 示例 3：
 *
 * 输入：nums = [4,2,2,2,4,4,2,2], limit = 0
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^9
 * 0 <= limit <= 10^9
 *
 *
 */

// @lc code=start
// sliding window + queue
function longestSubarray(nums: number[], limit: number): number {
  const maxQueue: number[] = [];
  const minQueue: number[] = [];
  const n = nums.length;
  let left = 0;
  let right = 0;
  let ret = 0;

  while (right < n) {
    while (maxQueue.length && maxQueue[maxQueue.length - 1] < nums[right]) {
      maxQueue.pop();
    }
    while (minQueue.length && minQueue[minQueue.length - 1] > nums[right]) {
      minQueue.pop();
    }
    maxQueue.push(nums[right]);
    minQueue.push(nums[right]);

    while (
      maxQueue.length &&
      minQueue.length &&
      maxQueue[0] - minQueue[0] > limit
    ) {
      if (nums[left] === minQueue[0]) {
        minQueue.shift();
      }
      if (nums[left] === maxQueue[0]) {
        maxQueue.shift();
      }
      left++;
    }
    ret = Math.max(ret, right - left + 1);
    right++;
  }

  return ret;
}

// @lc code=end
