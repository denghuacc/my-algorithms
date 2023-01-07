/*
 * @lc app=leetcode.cn id=1658 lang=typescript
 *
 * [1658] 将 x 减到 0 的最小操作数
 *
 * https://leetcode.cn/problems/minimum-operations-to-reduce-x-to-zero/description/
 *
 * algorithms
 * Medium (32.84%)
 * Likes:    166
 * Dislikes: 0
 * Total Accepted:    20.3K
 * Total Submissions: 57.7K
 * Testcase Example:  '[1,1,4,2,3]\n5'
 *
 * 给你一个整数数组 nums 和一个整数 x 。每一次操作时，你应当移除数组 nums 最左边或最右边的元素，然后从 x 中减去该元素的值。请注意，需要
 * 修改 数组以供接下来的操作使用。
 *
 * 如果可以将 x 恰好 减到 0 ，返回 最小操作数 ；否则，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,4,2,3], x = 5
 * 输出：2
 * 解释：最佳解决方案是移除后两个元素，将 x 减到 0 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,6,7,8,9], x = 4
 * 输出：-1
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [3,2,20,1,1,3], x = 10
 * 输出：5
 * 解释：最佳解决方案是移除后三个元素和前两个元素（总共 5 次操作），将 x 减到 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * 1
 *
 *
 */

// @lc code=start
// sliding window
function minOperations(nums: number[], x: number): number {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b);
  if (sum < x) {
    return -1;
  }

  let right = 0;
  let lSum = 0;
  let rSum = sum;
  let res = n + 1;

  for (let left = -1; left < n; left++) {
    if (left != -1) {
      lSum += nums[left];
    }
    while (right < n && lSum + rSum > x) {
      rSum -= nums[right];
      right++;
    }
    if (lSum + rSum === x) {
      res = Math.min(res, left + 1 + (n - right));
    }
  }

  return res > n ? -1 : res;
}
// @lc code=end
