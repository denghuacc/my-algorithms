/*
 * @lc app=leetcode.cn id=1802 lang=typescript
 *
 * [1802] 有界数组中指定下标处的最大值
 *
 * https://leetcode.cn/problems/maximum-value-at-a-given-index-in-a-bounded-array/description/
 *
 * algorithms
 * Medium (29.33%)
 * Likes:    71
 * Dislikes: 0
 * Total Accepted:    9.4K
 * Total Submissions: 28.7K
 * Testcase Example:  '4\n2\n6'
 *
 * 给你三个正整数 n、index 和 maxSum 。你需要构造一个同时满足下述所有条件的数组 nums（下标 从 0 开始 计数）：
 *
 *
 * nums.length == n
 * nums[i] 是 正整数 ，其中 0 <= i < n
 * abs(nums[i] - nums[i+1]) <= 1 ，其中 0 <= i < n-1
 * nums 中所有元素之和不超过 maxSum
 * nums[index] 的值被 最大化
 *
 *
 * 返回你所构造的数组中的 nums[index] 。
 *
 * 注意：abs(x) 等于 x 的前提是 x >= 0 ；否则，abs(x) 等于 -x 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 4, index = 2,  maxSum = 6
 * 输出：2
 * 解释：数组 [1,1,2,1] 和 [1,2,2,1] 满足所有条件。不存在其他在指定下标处具有更大值的有效数组。
 *
 *
 * 示例 2：
 *
 * 输入：n = 6, index = 1,  maxSum = 10
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= maxSum <= 10^9
 * 0 <= index < n
 *
 *
 */

// @lc code=start
function maxValue(n: number, index: number, maxSum: number): number {
  let left = 1;
  let right = maxSum;
  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    if (valid(mid)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return left;

  function valid(mid: number): boolean {
    const left = index;
    const right = n - index - 1;
    return mid + calc(mid, left) + calc(mid, right) <= maxSum;
  }

  function calc(big: number, length: number): number {
    if (length + 1 < big) {
      const small = big - length;
      return Math.floor(((big - 1 + small) * length) / 2);
    } else {
      const ones = length - (big - 1);
      return Math.floor((big * (big - 1)) / 2) + ones;
    }
  }
}
// @lc code=end
