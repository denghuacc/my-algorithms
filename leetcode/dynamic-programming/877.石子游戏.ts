/*
 * @lc app=leetcode.cn id=877 lang=typescript
 *
 * [877] 石子游戏
 *
 * https://leetcode-cn.com/problems/stone-game/description/
 *
 * algorithms
 * Medium (59.51%)
 * Likes:    149
 * Dislikes: 0
 * Total Accepted:    16K
 * Total Submissions: 23.1K
 * Testcase Example:  '[5,3,4,5]'
 *
 * 亚历克斯和李用几堆石子在做游戏。偶数堆石子排成一行，每堆都有正整数颗石子 piles[i] 。
 *
 * 游戏以谁手中的石子最多来决出胜负。石子的总数是奇数，所以没有平局。
 *
 * 亚历克斯和李轮流进行，亚历克斯先开始。 每回合，玩家从行的开始或结束处取走整堆石头。
 * 这种情况一直持续到没有更多的石子堆为止，此时手中石子最多的玩家获胜。
 *
 * 假设亚历克斯和李都发挥出最佳水平，当亚历克斯赢得比赛时返回 true ，当李赢得比赛时返回 false 。
 *
 *
 *
 * 示例：
 *
 * 输入：[5,3,4,5]
 * 输出：true
 * 解释：
 * 亚历克斯先开始，只能拿前 5 颗或后 5 颗石子 。
 * 假设他取了前 5 颗，这一行就变成了 [3,4,5] 。
 * 如果李拿走前 3 颗，那么剩下的是 [4,5]，亚历克斯拿走后 5 颗赢得 10 分。
 * 如果李拿走后 5 颗，那么剩下的是 [3,4]，亚历克斯拿走后 4 颗赢得 9 分。
 * 这表明，取前 5 颗石子对亚历克斯来说是一个胜利的举动，所以我们返回 true 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= piles.length <= 500
 * piles.length 是偶数。
 * 1 <= piles[i] <= 500
 * sum(piles) 是奇数。
 *
 *
 */

// @lc code=start
// math 先手 Alex 总是赢
var stoneGame = function (piles: number[]): boolean {
  return true;
};

// dp -> dp[i][j] Alex 可以获得的最大分数
var stoneGame = function (piles: number[]): boolean {
  const n = piles.length;
  const dp = Array.from(new Array(n + 2), () => new Array(n + 2).fill(0));

  for (let size = 1; size <= n; size++) {
    for (let i = 0; i + size <= n; i++) {
      let j = i + size - 1;
      let parity = (j + i + n) % 2;

      // Alex 取石子 增加自己分数
      if (parity === 1) {
        dp[i + 1][j + 1] = Math.max(
          piles[i] + dp[i + 2][j + 1], // 取开始处
          piles[j] + dp[i + 1][j] // 取结束处
        );
      }
      // Lee 取石子 减少 Alex 分数
      else {
        dp[i + 1][j + 1] = Math.min(
          -piles[i] + dp[i + 2][j + 1],
          -piles[j] + dp[i + 1][j]
        );
      }
    }
  }

  return dp[1][n] > 0;
};

// dp -> dp[i][j] 先手和后手的差
var stoneGame = function (piles: number[]): boolean {
  const n = piles.length;
  const dp = Array.from(new Array(n + 2), () => new Array(n + 2).fill(0));

  for (let size = 1; size <= n; size++) {
    for (let i = 0; i + size <= n; i++) {
      let j = size + 1;
      dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j - 1] - dp[i][j - 1]);
    }
  }

  return dp[0][n] > 0;
};
// @lc code=end
