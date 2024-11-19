/*
 * @lc app=leetcode.cn id=3243 lang=typescript
 *
 * [3243] 新增道路查询后的最短距离 I
 *
 * https://leetcode.cn/problems/shortest-distance-after-road-addition-queries-i/description/
 *
 * algorithms
 * Medium (39.83%)
 * Likes:    36
 * Dislikes: 0
 * Total Accepted:    10.9K
 * Total Submissions: 20.9K
 * Testcase Example:  '5\n[[2,4],[0,2],[0,4]]'
 *
 * 给你一个整数 n 和一个二维整数数组 queries。
 *
 * 有 n 个城市，编号从 0 到 n - 1。初始时，每个城市 i 都有一条单向道路通往城市 i + 1（ 0 <= i < n - 1）。
 *
 * queries[i] = [ui, vi] 表示新建一条从城市 ui 到城市 vi 的单向道路。每次查询后，你需要找到从城市 0 到城市 n - 1
 * 的最短路径的长度。
 *
 * 返回一个数组 answer，对于范围 [0, queries.length - 1] 中的每个 i，answer[i] 是处理完前 i + 1
 * 个查询后，从城市 0 到城市 n - 1 的最短路径的长度。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： n = 5, queries = [[2, 4], [0, 2], [0, 4]]
 *
 * 输出： [3, 2, 1]
 *
 * 解释：
 *
 *
 *
 * 新增一条从 2 到 4 的道路后，从 0 到 4 的最短路径长度为 3。
 *
 *
 *
 * 新增一条从 0 到 2 的道路后，从 0 到 4 的最短路径长度为 2。
 *
 *
 *
 * 新增一条从 0 到 4 的道路后，从 0 到 4 的最短路径长度为 1。
 *
 *
 * 示例 2：
 *
 *
 * 输入： n = 4, queries = [[0, 3], [0, 2]]
 *
 * 输出： [1, 1]
 *
 * 解释：
 *
 *
 *
 * 新增一条从 0 到 3 的道路后，从 0 到 3 的最短路径长度为 1。
 *
 *
 *
 * 新增一条从 0 到 2 的道路后，从 0 到 3 的最短路径长度仍为 1。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= n <= 500
 * 1 <= queries.length <= 500
 * queries[i].length == 2
 * 0 <= queries[i][0] < queries[i][1] < n
 * 1 < queries[i][1] - queries[i][0]
 * 查询中没有重复的道路。
 *
 *
 */

// @lc code=start
function shortestDistanceAfterQueries(
  n: number,
  queries: number[][]
): number[] {
  const neighbors: number[][] = Array.from(new Array(n), () => []);
  for (let i = 0; i < n - 1; i++) {
    neighbors[i].push(i + 1);
  }
  const res = [];
  for (let i = 0; i < queries.length; i++) {
    neighbors[queries[i][0]].push(queries[i][1]);
    res.push(bfs());
  }
  return res;

  function bfs(): number {
    const dist = new Array(n).fill(-1);
    dist[0] = 0;
    const q = [0];
    while (q.length) {
      const x = q.shift()!;
      for (const y of neighbors[x]) {
        if (dist[y] >= 0) {
          continue;
        }
        q.push(y);
        dist[y] = dist[x] + 1;
      }
    }
    return dist[n - 1];
  }
}
// @lc code=end
