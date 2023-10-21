/*
 * @lc app=leetcode.cn id=2316 lang=typescript
 *
 * [2316] 统计无向图中无法互相到达点对数
 *
 * https://leetcode.cn/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/description/
 *
 * algorithms
 * Medium (39.25%)
 * Likes:    82
 * Dislikes: 0
 * Total Accepted:    17.7K
 * Total Submissions: 37.6K
 * Testcase Example:  '3\n[[0,1],[0,2],[1,2]]'
 *
 * 给你一个整数 n ，表示一张 无向图 中有 n 个节点，编号为 0 到 n - 1 。同时给你一个二维整数数组 edges ，其中 edges[i] =
 * [ai, bi] 表示节点 ai 和 bi 之间有一条 无向 边。
 *
 * 请你返回 无法互相到达 的不同 点对数目 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：n = 3, edges = [[0,1],[0,2],[1,2]]
 * 输出：0
 * 解释：所有点都能互相到达，意味着没有点对无法互相到达，所以我们返回 0 。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]
 * 输出：14
 * 解释：总共有 14 个点对互相无法到达：
 *
 * [[0,1],[0,3],[0,6],[1,2],[1,3],[1,4],[1,5],[2,3],[2,6],[3,4],[3,5],[3,6],[4,6],[5,6]]
 * 所以我们返回 14 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^5
 * 0 <= edges.length <= 2 * 10^5
 * edges[i].length == 2
 * 0 <= ai, bi < n
 * ai != bi
 * 不会有重复边。
 *
 *
 */

// @lc code=start
function countPairs(n: number, edges: number[][]): number {
  const graph: number[][] = Array.from(new Array(n), () => []);
  for (const [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  const visited: boolean[] = new Array(n).fill(false);
  let res = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      const count = dfs(i);
      res += count * (n - count);
    }
  }
  return Math.floor(res / 2);

  function dfs(x: number): number {
    visited[x] = true;
    let count = 1;
    for (const y of graph[x]) {
      if (!visited[y]) {
        count += dfs(y);
      }
    }
    return count;
  }
}
// @lc code=end
