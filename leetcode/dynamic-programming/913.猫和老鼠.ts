/*
 * @lc app=leetcode.cn id=913 lang=typescript
 *
 * [913] 猫和老鼠
 *
 * https://leetcode-cn.com/problems/j-and-i/description/
 *
 * algorithms
 * Hard (53.30%)
 * Likes:    140
 * Dislikes: 0
 * Total Accepted:    4.5K
 * Total Submissions: 8.4K
 * Testcase Example:  '[[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]'
 *
 * 两位玩家分别扮演猫和老鼠，在一张 无向 图上进行游戏，两人轮流行动。
 *
 * 图的形式是：graph[a] 是一个列表，由满足 ab 是图中的一条边的所有节点 b 组成。
 *
 * 老鼠从节点 1 开始，第一个出发；猫从节点 2 开始，第二个出发。在节点 0 处有一个洞。
 *
 * 在每个玩家的行动中，他们 必须 沿着图中与所在当前位置连通的一条边移动。例如，如果老鼠在节点 1 ，那么它必须移动到 graph[1] 中的任一节点。
 *
 * 此外，猫无法移动到洞中（节点 0）。
 *
 * 然后，游戏在出现以下三种情形之一时结束：
 *
 *
 * 如果猫和老鼠出现在同一个节点，猫获胜。
 * 如果老鼠到达洞中，老鼠获胜。
 * 如果某一位置重复出现（即，玩家的位置和移动顺序都与上一次行动相同），游戏平局。
 *
 *
 * 给你一张图 graph ，并假设两位玩家都都以最佳状态参与游戏：
 *
 *
 * 如果老鼠获胜，则返回 1；
 * 如果猫获胜，则返回 2；
 * 如果平局，则返回 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：graph = [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]
 * 输出：0
 *
 *
 * 示例 2：
 *
 *
 * 输入：graph = [[1,3],[0],[3],[0,2]]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= graph.length <= 50
 * 1 <= graph[i].length < graph.length
 * 0 <= graph[i][j] < graph.length
 * graph[i][j] != i
 * graph[i] 互不相同
 * 猫和老鼠在游戏中总是移动
 *
 *
 */

// @lc code=start
function catMouseGame(graph: number[][]): number {
  const MOUSE_WIN = 1;
  const CAT_WIN = 2;
  const DRAW = 0;
  const n = graph.length;
  // dp[i][j][k] -> 老鼠位于节点 i 点，猫位于节点 j 点，游戏已经进行了 k 轮的状态的游戏结果
  const dp = Array.from(new Array(n), () =>
    Array.from(new Array(n), () => new Array(n * 2).fill(-1))
  );
  return getResult(1, 2, 0);

  function getResult(i: number, j: number, k: number): number {
    if (k === n * 2) {
      return DRAW;
    }
    if (dp[i][j][k] < 0) {
      if (i === 0) {
        dp[i][j][k] = MOUSE_WIN;
      } else if (i === j) {
        dp[i][j][k] = CAT_WIN;
      } else {
        getNextResult(i, j, k);
      }
    }
    return dp[i][j][k];
  }

  function getNextResult(i: number, j: number, k: number) {
    const curMove = k % 2 === 0 ? i : j;
    const defaultResult = curMove === i ? CAT_WIN : MOUSE_WIN;
    let result = defaultResult;
    const nextNodes = graph[curMove];
    for (const next of nextNodes) {
      if (curMove === j && next === 0) {
        continue;
      }
      const nextMouse = curMove === i ? next : i;
      const nextCat = curMove == j ? next : j;
      const nextResult = getResult(nextMouse, nextCat, k + 1);
      if (nextResult !== defaultResult) {
        result = nextResult;
        if (result !== DRAW) {
          break;
        }
      }
    }
    dp[i][j][k] = result;
  }
}
// @lc code=end
