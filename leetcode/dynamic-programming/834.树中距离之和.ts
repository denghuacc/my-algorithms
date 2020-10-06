/*
 * @lc app=leetcode.cn id=834 lang=typescript
 *
 * [834] 树中距离之和
 *
 * https://leetcode-cn.com/problems/sum-of-distances-in-tree/description/
 *
 * algorithms
 * Hard (34.42%)
 * Likes:    104
 * Dislikes: 0
 * Total Accepted:    2.3K
 * Total Submissions: 6.3K
 * Testcase Example:  '6\n[[0,1],[0,2],[2,3],[2,4],[2,5]]'
 *
 * 给定一个无向、连通的树。树中有 N 个标记为 0...N-1 的节点以及 N-1 条边 。
 *
 * 第 i 条边连接节点 edges[i][0] 和 edges[i][1] 。
 *
 * 返回一个表示节点 i 与其他所有节点距离之和的列表 ans。
 *
 * 示例 1:
 *
 *
 * 输入: N = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
 * 输出: [8,12,6,10,10,10]
 * 解释:
 * 如下为给定的树的示意图：
 * ⁠ 0
 * ⁠/ \
 * 1   2
 * ⁠  /|\
 * ⁠ 3 4 5
 *
 * 我们可以计算出 dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
 * 也就是 1 + 1 + 2 + 2 + 2 = 8。 因此，answer[0] = 8，以此类推。
 *
 *
 * 说明: 1 <= N <= 10000
 *
 */

// @lc code=start
// dp 😥
function sumOfDistancesInTree(N: number, edges: number[][]): number[] {
  const ret: number[] = new Array(N).fill(0);
  const dp: number[] = new Array(N).fill(0);
  const sz: number[] = new Array(N).fill(0);
  const graph: number[][] = Array.from(new Array(N), () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  dfs(0, -1);
  dfs2(0, -1);
  return ret;

  function dfs(u: number, f: number): void {
    sz[u] = 1;
    dp[u] = 0;
    for (const v of graph[u]) {
      if (v === f) continue;
      dfs(v, u);
      dp[u] += dp[v] + sz[v];
      sz[u] += sz[v];
    }
  }

  function dfs2(u: number, f: number): void {
    ret[u] = dp[u];
    for (const v of graph[u]) {
      if (v === f) continue;
      const pu = dp[u];
      const pv = dp[v];
      const su = sz[u];
      const sv = sz[v];

      dp[u] -= dp[v] + sz[v];
      sz[u] -= sz[v];
      dp[v] += dp[u] + sz[u];
      sz[v] += sz[u];

      dfs2(v, u);

      dp[u] = pu;
      dp[v] = pv;
      sz[u] = su;
      sz[v] = sv;
    }
  }
}
// @lc code=end
