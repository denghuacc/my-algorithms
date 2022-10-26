/*
 * @lc app=leetcode.cn id=862 lang=typescript
 *
 * [862] 和至少为 K 的最短子数组
 *
 * https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/description/
 *
 * algorithms
 * Hard (22.23%)
 * Likes:    483
 * Dislikes: 0
 * Total Accepted:    29.3K
 * Total Submissions: 126.8K
 * Testcase Example:  '[1]\n1'
 *
 * 给你一个整数数组 nums 和一个整数 k ，找出 nums 中和至少为 k 的 最短非空子数组 ，并返回该子数组的长度。如果不存在这样的 子数组
 * ，返回 -1 。
 *
 * 子数组 是数组中 连续 的一部分。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1], k = 1
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2], k = 4
 * 输出：-1
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [2,-1,2], k = 3
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -10^5 <= nums[i] <= 10^5
 * 1 <= k <= 10^9
 *
 *
 */

// @lc code=start
// prefix sum + dequeue
function shortestSubarray(nums: number[], k: number): number {
  const n = nums.length;
  const prefixSums = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSums[i + 1] = prefixSums[i] + nums[i];
  }
  let res = n + 1;
  const queue: number[] = [];
  for (let i = 0; i <= n; i++) {
    const curSum = prefixSums[i];
    while (queue.length && curSum - prefixSums[queue[0]] >= k) {
      res = Math.min(res, i - queue.shift()!);
    }
    while (queue.length && prefixSums[queue.at(-1)!] >= curSum) {
      queue.pop();
    }
    queue.push(i);
  }
  return res < n + 1 ? res : -1;
}
// @lc code=end
