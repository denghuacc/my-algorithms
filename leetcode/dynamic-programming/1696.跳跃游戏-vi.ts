/*
 * @lc app=leetcode.cn id=1696 lang=typescript
 *
 * [1696] 跳跃游戏 VI
 *
 * https://leetcode.cn/problems/jump-game-vi/description/
 *
 * algorithms
 * Medium (40.73%)
 * Likes:    164
 * Dislikes: 0
 * Total Accepted:    16.4K
 * Total Submissions: 38.8K
 * Testcase Example:  '[1,-1,-2,4,-7,3]\n2'
 *
 * 给你一个下标从 0 开始的整数数组 nums 和一个整数 k 。
 *
 * 一开始你在下标 0 处。每一步，你最多可以往前跳 k 步，但你不能跳出数组的边界。也就是说，你可以从下标 i 跳到 [i + 1， min(n - 1,
 * i + k)] 包含 两个端点的任意位置。
 *
 * 你的目标是到达数组最后一个位置（下标为 n - 1 ），你的 得分 为经过的所有数字之和。
 *
 * 请你返回你能得到的 最大得分 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,-1,-2,4,-7,3], k = 2
 * 输出：7
 * 解释：你可以选择子序列 [1,-1,4,3] （上面加粗的数字），和为 7 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [10,-5,-2,4,0,3], k = 3
 * 输出：17
 * 解释：你可以选择子序列 [10,4,3] （上面加粗数字），和为 17 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,-5,-20,4,-1,3,-6,-3], k = 2
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10^4
 *
 *
 */

// @lc code=start
// dp cv
function maxResult(nums: number[], k: number): number {
  const n = nums.length;
  const dp: number[] = new Array(n).fill(0);
  dp[0] = nums[0];
  const queue: number[] = [];
  queue.push(0);
  for (let i = 1; i < n; i++) {
    while (queue.length > 0 && queue[0] < i - k) {
      queue.shift();
    }
    dp[i] = dp[queue[0]] + nums[i];
    while (queue.length > 0 && dp[queue[queue.length - 1]] <= dp[i]) {
      queue.pop();
    }
    queue.push(i);
  }
  return dp[n - 1];
}
// @lc code=end
