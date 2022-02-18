/*
 * @lc app=leetcode.cn id=1791 lang=typescript
 *
 * [1791] 找出星型图的中心节点
 *
 * https://leetcode-cn.com/problems/find-center-of-star-graph/description/
 *
 * algorithms
 * Easy (83.63%)
 * Likes:    26
 * Dislikes: 0
 * Total Accepted:    21K
 * Total Submissions: 25.2K
 * Testcase Example:  '[[1,2],[2,3],[4,2]]'
 *
 * 有一个无向的 星型 图，由 n 个编号从 1 到 n 的节点组成。星型图有一个 中心 节点，并且恰有 n - 1
 * 条边将中心节点与其他每个节点连接起来。
 *
 * 给你一个二维整数数组 edges ，其中 edges[i] = [ui, vi] 表示在节点 ui 和 vi 之间存在一条边。请你找出并返回 edges
 * 所表示星型图的中心节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：edges = [[1,2],[2,3],[4,2]]
 * 输出：2
 * 解释：如上图所示，节点 2 与其他每个节点都相连，所以节点 2 是中心节点。
 *
 *
 * 示例 2：
 *
 *
 * 输入：edges = [[1,2],[5,1],[1,3],[1,4]]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3
 * edges.length == n - 1
 * edges[i].length == 2
 * 1 i, vi
 * ui != vi
 * 题目数据给出的 edges 表示一个有效的星型图
 *
 *
 */

// @lc code=start
var findCenter = function (edges: number[][]): number {
  const map = new Map<number, number>();
  for (const [u, v] of edges) {
    map.set(u, (map.get(u) ?? 0) + 1);
    map.set(v, (map.get(v) ?? 0) + 1);
  }

  let res = 0;
  for (const [k, v] of map) {
    if (v === edges.length) {
      res = k;
    }
  }
  return res;
};

var findCenter = function (edges: number[][]): number {
  const [u1, v1] = edges[0];
  const [u2, v2] = edges[1];

  if (u1 === u2 || u1 === v2) {
    return u1;
  }
  return v1;
};
// @lc code=end
