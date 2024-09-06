/*
 * @lc app=leetcode.cn id=3176 lang=typescript
 *
 * [3176] 求出最长好子序列 I
 *
 * https://leetcode.cn/problems/find-the-maximum-length-of-a-good-subsequence-i/description/
 *
 * algorithms
 * Medium (30.86%)
 * Likes:    19
 * Dislikes: 0
 * Total Accepted:    4.4K
 * Total Submissions: 11.4K
 * Testcase Example:  '[1,2,1,1,3]\n2'
 *
 * 给你一个整数数组 nums 和一个 非负 整数 k 。如果一个整数序列 seq 满足在范围下标范围 [0, seq.length - 2] 中存在
 * 不超过 k 个下标 i 满足 seq[i] != seq[i + 1] ，那么我们称这个整数序列为 好 序列。
 *
 * 请你返回 nums 中 好 子序列 的最长长度
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,1,1,3], k = 2
 *
 * 输出：4
 *
 * 解释：
 *
 * 最长好子序列为 [1,2,1,1,3] 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3,4,5,1], k = 0
 *
 * 输出：2
 *
 * 解释：
 *
 * 最长好子序列为 [1,2,3,4,5,1] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 500
 * 1 <= nums[i] <= 10^9
 * 0 <= k <= min(nums.length, 25)
 *
 *
 */

// @lc code=start
function maximumLength(nums: number[], k: number): number {
  let res = 0;
  const n = nums.length;
  // dp[i][j] -> 以 nums[i] 结尾组成的最长合法序列中有 j 个数字与其在序列中的后一个数字不相等
  const dp: number[][] = Array.from(new Array(n), () => new Array(51).fill(-1));
  for (let i = 0; i < n; i++) {
    dp[i][0] = 1;
    for (let l = 0; l <= k; l++) {
      for (let j = 0; j < i; j++) {
        const add = nums[i] !== nums[j] ? 1 : 0;
        if (l - add >= 0 && dp[j][l - add] !== -1) {
          dp[i][l] = Math.max(dp[i][l], dp[j][l - add] + 1);
        }
      }
      res = Math.max(res, dp[i][l]);
    }
  }
  return res;
}
// @lc code=end
