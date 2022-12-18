/*
 * @lc app=leetcode.cn id=1703 lang=typescript
 *
 * [1703] 得到连续 K 个 1 的最少相邻交换次数
 *
 * https://leetcode.cn/problems/minimum-adjacent-swaps-for-k-consecutive-ones/description/
 *
 * algorithms
 * Hard (38.53%)
 * Likes:    80
 * Dislikes: 0
 * Total Accepted:    3.7K
 * Total Submissions: 8.4K
 * Testcase Example:  '[1,0,0,1,0,1]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k 。 nums 仅包含 0 和 1 。每一次移动，你可以选择 相邻 两个数字并将它们交换。
 *
 * 请你返回使 nums 中包含 k 个 连续 1 的 最少 交换次数。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,0,0,1,0,1], k = 2
 * 输出：1
 * 解释：在第一次操作时，nums 可以变成 [1,0,0,0,1,1] 得到连续两个 1 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [1,0,0,0,0,0,1,1], k = 3
 * 输出：5
 * 解释：通过 5 次操作，最左边的 1 可以移到右边直到 nums 变为 [0,0,0,0,0,1,1,1] 。
 *
 *
 * 示例 3：
 *
 * 输入：nums = [1,1,0,1], k = 2
 * 输出：0
 * 解释：nums 已经有连续 2 个 1 了。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * nums[i] 要么是 0 ，要么是 1 。
 * 1 <= k <= sum(nums)
 *
 *
 */

// @lc code=start
// greedy cv
function minMoves(nums: number[], k: number): number {
  const group: number[] = [];
  const preSum: number[] = [];
  preSum.push(0);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      group.push(i - group.length);
      preSum.push(preSum.at(-1)! + group.at(-1)!);
    }
  }
  let res = Infinity;
  const n = group.length;
  for (let i = 0; i <= n - k; i++) {
    const mid = i + Math.floor(k / 2);
    const r = group[mid];
    res = Math.min(
      res,
      (1 - (k % 2)) * r +
        (preSum[i + k] - preSum[mid + 1]) -
        (preSum[mid] - preSum[i])
    );
  }
  return res;
}
// @lc code=end
