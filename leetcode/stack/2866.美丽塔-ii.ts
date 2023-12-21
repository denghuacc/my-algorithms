/*
 * @lc app=leetcode.cn id=2866 lang=typescript
 *
 * [2866] 美丽塔 II
 *
 * https://leetcode.cn/problems/beautiful-towers-ii/description/
 *
 * algorithms
 * Medium (41.98%)
 * Likes:    47
 * Dislikes: 0
 * Total Accepted:    6.6K
 * Total Submissions: 15.8K
 * Testcase Example:  '[5,3,4,1,1]'
 *
 * 给你一个长度为 n 下标从 0 开始的整数数组 maxHeights 。
 *
 * 你的任务是在坐标轴上建 n 座塔。第 i 座塔的下标为 i ，高度为 heights[i] 。
 *
 * 如果以下条件满足，我们称这些塔是 美丽 的：
 *
 *
 * 1 <= heights[i] <= maxHeights[i]
 * heights 是一个 山脉 数组。
 *
 *
 * 如果存在下标 i 满足以下条件，那么我们称数组 heights 是一个 山脉 数组：
 *
 *
 * 对于所有 0 < j <= i ，都有 heights[j - 1] <= heights[j]
 * 对于所有 i <= k < n - 1 ，都有 heights[k + 1] <= heights[k]
 *
 *
 * 请你返回满足 美丽塔 要求的方案中，高度和的最大值 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：maxHeights = [5,3,4,1,1]
 * 输出：13
 * 解释：和最大的美丽塔方案为 heights = [5,3,3,1,1] ，这是一个美丽塔方案，因为：
 * - 1 <= heights[i] <= maxHeights[i]
 * - heights 是个山脉数组，峰值在 i = 0 处。
 * 13 是所有美丽塔方案中的最大高度和。
 *
 * 示例 2：
 *
 *
 * 输入：maxHeights = [6,5,3,9,2,7]
 * 输出：22
 * 解释： 和最大的美丽塔方案为 heights = [3,3,3,9,2,2] ，这是一个美丽塔方案，因为：
 * - 1 <= heights[i] <= maxHeights[i]
 * - heights 是个山脉数组，峰值在 i = 3 处。
 * 22 是所有美丽塔方案中的最大高度和。
 *
 * 示例 3：
 *
 *
 * 输入：maxHeights = [3,2,5,5,2,3]
 * 输出：18
 * 解释：和最大的美丽塔方案为 heights = [2,2,5,5,2,2] ，这是一个美丽塔方案，因为：
 * - 1 <= heights[i] <= maxHeights[i]
 * - heights 是个山脉数组，最大值在 i = 2 处。
 * 注意，在这个方案中，i = 3 也是一个峰值。
 * 18 是所有美丽塔方案中的最大高度和。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n == maxHeights <= 10^5
 * 1 <= maxHeights[i] <= 10^9
 *
 *
 */

// @lc code=start
// stack cv
function maximumSumOfHeights(maxHeights: number[]): number {
  const n = maxHeights.length;
  const prefix: number[] = new Array(n).fill(0);
  const suffix: number[] = new Array(n).fill(0);
  const stack1: number[] = [];
  const stack2: number[] = [];
  for (let i = 0; i < n; i++) {
    while (stack1.length > 0 && maxHeights[i] < maxHeights[stack1.at(-1)!]) {
      stack1.pop();
    }
    if (stack1.length == 0) {
      prefix[i] = (i + 1) * maxHeights[i];
    } else {
      const last = stack1.at(-1)!;
      prefix[i] = prefix[last] + (i - last) * maxHeights[i];
    }
    stack1.push(i);
  }

  let res = 0;
  for (let i = n - 1; i >= 0; i--) {
    while (stack2.length && maxHeights[i] < maxHeights[stack2.at(-1)!]) {
      stack2.pop();
    }
    if (stack2.length == 0) {
      suffix[i] = (n - i) * maxHeights[i];
    } else {
      const last = stack2.at(-1)!;
      suffix[i] = suffix[last] + (last - i) * maxHeights[i];
    }
    stack2.push(i);
    res = Math.max(res, prefix[i] + suffix[i] - maxHeights[i]);
  }
  return res;
}
// @lc code=end
