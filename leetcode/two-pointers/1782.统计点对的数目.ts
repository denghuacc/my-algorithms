/*
 * @lc app=leetcode.cn id=1782 lang=typescript
 *
 * [1782] 统计点对的数目
 *
 * https://leetcode.cn/problems/count-pairs-of-nodes/description/
 *
 * algorithms
 * Hard (37.21%)
 * Likes:    80
 * Dislikes: 0
 * Total Accepted:    4.7K
 * Total Submissions: 9.4K
 * Testcase Example:  '4\n[[1,2],[2,4],[1,3],[2,3],[2,1]]\n[2,3]'
 *
 * 给你一个无向图，无向图由整数 n  ，表示图中节点的数目，和 edges 组成，其中 edges[i] = [ui, vi] 表示 ui 和 vi
 * 之间有一条无向边。同时给你一个代表查询的整数数组 queries 。
 *
 * 第 j 个查询的答案是满足如下条件的点对 (a, b) 的数目：
 *
 *
 * a < b
 * cnt 是与 a 或者 b 相连的边的数目，且 cnt 严格大于 queries[j] 。
 *
 *
 * 请你返回一个数组 answers ，其中 answers.length == queries.length 且 answers[j] 是第 j
 * 个查询的答案。
 *
 * 请注意，图中可能会有 重复边 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 4, edges = [[1,2],[2,4],[1,3],[2,3],[2,1]], queries = [2,3]
 * 输出：[6,5]
 * 解释：每个点对中，与至少一个点相连的边的数目如上图所示。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 5, edges = [[1,5],[1,5],[3,4],[2,5],[1,3],[5,1],[2,3],[2,5]], queries
 * = [1,2,3,4,5]
 * 输出：[10,10,9,8,6]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * 1
 * 1 i, vi
 * ui != vi
 * 1
 * 0
 *
 *
 */

export {};

// @lc code=start
// two pointers cv
function countPairs(n: number, edges: number[][], queries: number[]): number[] {
  const degree = new Array(n).fill(0);
  const cnt = new Map();
  for (const edge of edges) {
    let x = edge[0] - 1;
    let y = edge[1] - 1;
    if (x > y) {
      const tmp = x;
      x = y;
      y = tmp;
    }
    degree[x]++;
    degree[y]++;
    const key = x * n + y;
    cnt.set(key, cnt.has(key) ? cnt.get(key) + 1 : 1);
  }
  const arr = Array.from(degree);
  const res = new Array(queries.length);
  arr.sort((a, b) => a - b);
  for (let k = 0; k < queries.length; k++) {
    const bound = queries[k];
    let total = 0;
    for (let i = 0, j = n - 1; i < n; i++) {
      while (j > i && arr[i] + arr[j] > bound) {
        j--;
      }
      total += n - 1 - Math.max(i, j);
    }
    for (const [val, freq] of cnt.entries()) {
      const x = Math.floor(val / n);
      const y = val % n;
      if (
        degree[x] + degree[y] > bound &&
        degree[x] + degree[y] - freq <= bound
      ) {
        total--;
      }
    }
    res[k] = total;
  }
  return res;
}
// @lc code=end
