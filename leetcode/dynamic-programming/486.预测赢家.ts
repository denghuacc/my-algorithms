/*
 * @lc app=leetcode.cn id=486 lang=typescript
 *
 * [486] 预测赢家
 *
 * https://leetcode-cn.com/problems/predict-the-winner/description/
 *
 * algorithms
 * Medium (52.73%)
 * Likes:    208
 * Dislikes: 0
 * Total Accepted:    10.4K
 * Total Submissions: 19.3K
 * Testcase Example:  '[1,5,2]'
 *
 * 给定一个表示分数的非负整数数组。 玩家 1 从数组任意一端拿取一个分数，随后玩家 2 继续从剩余数组任意一端拿取分数，然后玩家 1 拿，……
 * 。每次一个玩家只能拿取一个分数，分数被拿取之后不再可取。直到没有剩余分数可取时游戏结束。最终获得分数总和最多的玩家获胜。
 *
 * 给定一个表示分数的数组，预测玩家1是否会成为赢家。你可以假设每个玩家的玩法都会使他的分数最大化。
 *
 *
 *
 * 示例 1：
 *
 * 输入：[1, 5, 2]
 * 输出：False
 * 解释：一开始，玩家1可以从1和2中进行选择。
 * 如果他选择 2（或者 1 ），那么玩家 2 可以从 1（或者 2 ）和 5 中进行选择。如果玩家 2 选择了 5 ，那么玩家 1 则只剩下 1（或者 2
 * ）可选。
 * 所以，玩家 1 的最终分数为 1 + 2 = 3，而玩家 2 为 5 。
 * 因此，玩家 1 永远不会成为赢家，返回 False 。
 *
 *
 * 示例 2：
 *
 * 输入：[1, 5, 233, 7]
 * 输出：True
 * 解释：玩家 1 一开始选择 1 。然后玩家 2 必须从 5 和 7 中进行选择。无论玩家 2 选择了哪个，玩家 1 都可以选择 233 。
 * ⁠    最终，玩家 1（234 分）比玩家 2（12 分）获得更多的分数，所以返回 True，表示玩家 1 可以成为赢家。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= 给定的数组长度 <= 20.
 * 数组里所有分数都为非负数且不会大于 10000000 。
 * 如果最终两个玩家的分数相等，那么玩家 1 仍为赢家。
 *
 *
 */

// @lc code=start
// dp
var PredictTheWinner = function (nums: number[]): boolean {
  const n = nums.length;

  // dp[i][j] -> dp[i:j] 玩家的分数差的最大值
  const dp: number[][] = Array.from(new Array(n), () => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    dp[i][i] = nums[i];
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
    }
  }

  return dp[0][n - 1] >= 0;
};

// dp2
var PredictTheWinner = function (nums: number[]): boolean {
  const n = nums.length;

  const dp: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    dp[i] = nums[i];
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      dp[j] = Math.max(nums[i] - dp[j], nums[j] - dp[j - 1]);
    }
  }

  return dp[n - 1] >= 0;
};

// recursive
var PredictTheWinner = function (nums: number[]): boolean {
  return total(nums, 0, nums.length - 1, 1) >= 0;

  function total(
    nums: number[],
    start: number,
    end: number,
    turn: number
  ): number {
    if (start === end) return nums[start] * turn;
    const scoreStart = nums[start] * turn + total(nums, start + 1, end, -turn);
    const scoreEnd = nums[end] * turn + total(nums, start, end - 1, -turn);
    return Math.max(scoreStart * turn, scoreEnd * turn) * turn;
  }
};
// @lc code=end
