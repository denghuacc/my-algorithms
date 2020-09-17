/*
 * @lc app=leetcode.cn id=685 lang=typescript
 *
 * [685] 冗余连接 II
 *
 * https://leetcode-cn.com/problems/redundant-connection-ii/description/
 *
 * algorithms
 * Hard (35.74%)
 * Likes:    97
 * Dislikes: 0
 * Total Accepted:    5.2K
 * Total Submissions: 13.6K
 * Testcase Example:  '[[1,2],[1,3],[2,3]]'
 *
 * 在本问题中，有根树指满足以下条件的有向图。该树只有一个根节点，所有其他节点都是该根节点的后继。每一个节点只有一个父节点，除了根节点没有父节点。
 *
 * 输入一个有向图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N)
 * 的树及一条附加的边构成。附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。
 *
 * 结果图是一个以边组成的二维数组。 每一个边 的元素是一对 [u, v]，用以表示有向图中连接顶点 u 和顶点 v 的边，其中 u 是 v
 * 的一个父节点。
 *
 * 返回一条能删除的边，使得剩下的图是有N个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。
 *
 * 示例 1:
 *
 * 输入: [[1,2], [1,3], [2,3]]
 * 输出: [2,3]
 * 解释: 给定的有向图如下:
 * ⁠ 1
 * ⁠/ \
 * v   v
 * 2-->3
 *
 *
 * 示例 2:
 *
 * 输入: [[1,2], [2,3], [3,4], [4,1], [1,5]]
 * 输出: [4,1]
 * 解释: 给定的有向图如下:
 * 5 <- 1 -> 2
 * ⁠    ^    |
 * ⁠    |    v
 * ⁠    4 <- 3
 *
 *
 * 注意:
 *
 *
 * 二维数组大小的在3到1000范围内。
 * 二维数组中的每个整数在1到N之间，其中 N 是二维数组的大小。
 *
 *
 */

// @lc code=start
class UnionFind {
  ancestor: number[];

  constructor(n: number) {
    this.ancestor = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      this.ancestor[i] = i;
    }
  }

  union(i: number, j: number): void {
    this.ancestor[this.find(i)] = this.find(j);
  }

  find(i: number): number {
    if (this.ancestor[i] !== i) {
      this.ancestor[i] = this.find(this.ancestor[i]);
    }
    return this.ancestor[i];
  }
}

// union find
var findRedundantDirectedConnection = function (edges: number[][]): number[] {
  const n = edges.length;
  const uf = new UnionFind(n + 1);
  const parent: number[] = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    parent[i] = i;
  }
  let conflict = -1; // 冲突边
  let cycle = -1; // 环路边

  for (let i = 0; i < n; i++) {
    const [node1, node2] = edges[i];
    if (parent[node2] !== node2) {
      conflict = i;
    } else {
      parent[node2] = node1;
      if (uf.find(node1) === uf.find(node2)) {
        cycle = i;
      } else {
        uf.union(node1, node2);
      }
    }
  }

  let redundant: number[] = [];
  if (conflict < 0) {
    redundant = [edges[cycle][0], edges[cycle][1]];
  } else {
    const conflictEdge = edges[conflict];
    if (cycle >= 0) {
      redundant = [parent[conflictEdge[1]], conflictEdge[1]];
    } else {
      redundant = [conflictEdge[0], conflictEdge[1]];
    }
  }

  return redundant;
};
// @lc code=end
