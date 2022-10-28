/*
 * @lc app=leetcode.cn id=907 lang=typescript
 *
 * [907] 子数组的最小值之和
 *
 * https://leetcode.cn/problems/sum-of-subarray-minimums/description/
 *
 * algorithms
 * Medium (35.26%)
 * Likes:    463
 * Dislikes: 0
 * Total Accepted:    25.7K
 * Total Submissions: 70.9K
 * Testcase Example:  '[3,1,2,4]'
 *
 * 给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。
 *
 * 由于答案可能很大，因此 返回答案模 10^9 + 7 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：arr = [3,1,2,4]
 * 输出：17
 * 解释：
 * 子数组为 [3]，[1]，[2]，[4]，[3,1]，[1,2]，[2,4]，[3,1,2]，[1,2,4]，[3,1,2,4]。
 * 最小值为 3，1，2，4，1，1，2，1，1，1，和为 17。
 *
 * 示例 2：
 *
 *
 * 输入：arr = [11,81,94,43,3]
 * 输出：444
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 *
 *
 *
 *
 */

// @lc code=start
// stack + dp
function sumSubarrayMins(arr: number[]): number {
  const MOD = 1e9 + 7;
  const n = arr.length;
  const stack: number[] = [];
  const dp = new Array(n).fill(0);
  let res = 0;
  for (let i = 0; i < n; i++) {
    while (stack.length && arr[stack.at(-1)!] > arr[i]) {
      stack.pop();
    }
    const k = stack.length === 0 ? i + 1 : i - stack.at(-1)!;
    dp[i] = k * arr[i] + (stack.length === 0 ? 0 : dp[i - k]);
    res = (res + dp[i]) % MOD;
    stack.push(i);
  }
  return res;
}
// @lc code=end
