/*
 * @lc app=leetcode.cn id=1617 lang=typescript
 *
 * [1617] 统计子树中城市之间最大距离
 *
 * https://leetcode.cn/problems/count-subtrees-with-max-distance-between-cities/description/
 *
 * algorithms
 * Hard (65.09%)
 * Likes:    112
 * Dislikes: 0
 * Total Accepted:    8.6K
 * Total Submissions: 11.1K
 * Testcase Example:  '4\n[[1,2],[2,3],[2,4]]'
 *
 * 给你 n 个城市，编号为从 1 到 n 。同时给你一个大小为 n-1 的数组 edges ，其中 edges[i] = [ui, vi] 表示城市 ui
 * 和 vi 之间有一条双向边。题目保证任意城市之间只有唯一的一条路径。换句话说，所有城市形成了一棵 树 。
 *
 * 一棵 子树
 * 是城市的一个子集，且子集中任意城市之间可以通过子集中的其他城市和边到达。两个子树被认为不一样的条件是至少有一个城市在其中一棵子树中存在，但在另一棵子树中不存在。
 *
 * 对于 d 从 1 到 n-1 ，请你找到城市间 最大距离 恰好为 d 的所有子树数目。
 *
 * 请你返回一个大小为 n-1 的数组，其中第 d 个元素（下标从 1 开始）是城市间 最大距离 恰好等于 d 的子树数目。
 *
 * 请注意，两个城市间距离定义为它们之间需要经过的边的数目。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：n = 4, edges = [[1,2],[2,3],[2,4]]
 * 输出：[3,4,0]
 * 解释：
 * 子树 {1,2}, {2,3} 和 {2,4} 最大距离都是 1 。
 * 子树 {1,2,3}, {1,2,4}, {2,3,4} 和 {1,2,3,4} 最大距离都为 2 。
 * 不存在城市间最大距离为 3 的子树。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 2, edges = [[1,2]]
 * 输出：[1]
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 3, edges = [[1,2],[2,3]]
 * 输出：[2,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * edges.length == n-1
 * edges[i].length == 2
 * 1 i, vi
 * 题目保证 (ui, vi) 所表示的边互不相同。
 *
 *
 */

// @lc code=start
// dfs cv
function countSubgraphsForEachDiameter(n: number, edges: number[][]): number[] {
  const adj: number[][] = Array.from(new Array(n), () => []);
  for (const edge of edges) {
    const x = edge[0] - 1;
    const y = edge[1] - 1;
    adj[x].push(y);
    adj[y].push(x);
  }

  const res: number[] = new Array(n - 1).fill(0);
  for (let i = 1; i < 1 << n; i++) {
    const x = 32 - numberOfLeadingZeros(i) - 1;
    let mask = i;
    let y = -1;
    const queue = [x];
    mask &= ~(1 << x);
    while (queue.length) {
      y = queue.shift()!;
      for (const vertex of adj[y]) {
        if ((mask & (1 << vertex)) !== 0) {
          mask &= ~(1 << vertex);
          queue.push(vertex);
        }
      }
    }
    if (mask === 0) {
      const diameter = dfs(adj, -1, y, i);
      if (diameter > 0) {
        res[diameter - 1]++;
      }
    }
  }
  return res;

  function dfs(
    adj: number[][],
    parent: number,
    u: number,
    mask: number
  ): number {
    let depth = 0;
    for (const v of adj[u]) {
      if (v !== parent && (mask & (1 << v)) !== 0) {
        depth = Math.max(depth, 1 + dfs(adj, u, v, mask));
      }
    }
    return depth;
  }

  function numberOfLeadingZeros(i: number): number {
    if (i === 0) return 32;
    let n = 1;
    if (i >>> 16 === 0) {
      n += 16;
      i <<= 16;
    }
    if (i >>> 24 === 0) {
      n += 8;
      i <<= 8;
    }
    if (i >>> 28 === 0) {
      n += 4;
      i <<= 4;
    }
    if (i >>> 30 === 0) {
      n += 2;
      i <<= 2;
    }
    n -= i >>> 31;
    return n;
  }
}
// @lc code=end
