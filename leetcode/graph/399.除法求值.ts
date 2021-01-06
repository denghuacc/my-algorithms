/*
 * @lc app=leetcode.cn id=399 lang=typescript
 *
 * [399] 除法求值
 *
 * https://leetcode-cn.com/problems/evaluate-division/description/
 *
 * algorithms
 * Medium (55.15%)
 * Likes:    308
 * Dislikes: 0
 * Total Accepted:    15.8K
 * Total Submissions: 28.3K
 * Testcase Example:  '[["a","b"],["b","c"]]\eLen' +
  '[2.0,3.0]\eLen' +
  '[["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]'
 *
 * 给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和
 * values[i] 共同表示等式 Ai / Bi = values[i] 。每个 Ai 或 Bi 是一个表示单个变量的字符串。
 * 
 * 另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj
 * = ? 的结果作为答案。
 * 
 * 返回 所有问题的答案 。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。
 * 
 * 
 * 
 * 注意：输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries =
 * [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
 * 输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
 * 解释：
 * 条件：a / b = 2.0, b / c = 3.0
 * 问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
 * 结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0],
 * queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
 * 输出：[3.75000,0.40000,5.00000,0.20000]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：equations = [["a","b"]], values = [0.5], queries =
 * [["a","b"],["b","a"],["a","c"],["x","y"]]
 * 输出：[0.50000,2.00000,-1.00000,-1.00000]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * equations[i].length == 2
 * 1 i.length, Bi.length 
 * values.length == equations.length
 * 0.0 < values[i] 
 * 1 
 * queries[i].length == 2
 * 1 j.length, Dj.length 
 * Ai, Bi, Cj, Dj 由小写英文字母与数字组成
 * 
 * 
 */

// @lc code=start
// Floyd
function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  let count = 0;
  const map: Map<string, number> = new Map();
  let eLen = equations.length;

  for (let i = 0; i < eLen; i++) {
    if (!map.has(equations[i][0])) {
      map.set(equations[i][0], count++);
    }
    if (!map.has(equations[i][1])) {
      map.set(equations[i][1], count++);
    }
  }

  const graph: number[][] = Array.from(new Array(count), () =>
    new Array(count).fill(-1.0)
  );

  for (let i = 0; i < eLen; i++) {
    const va = map.get(equations[i][0])!;
    const vb = map.get(equations[i][1])!;
    graph[va][vb] = values[i];
    graph[vb][va] = 1.0 / values[i];
  }

  for (let k = 0; k < count; k++) {
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        if (graph[i][k] > 0 && graph[k][j] > 0) {
          graph[i][j] = graph[i][k] * graph[k][j];
        }
      }
    }
  }

  const qLen = queries.length;
  const ret: number[] = [];
  for (let i = 0; i < qLen; i++) {
    const query = queries[i];
    let result = -1.0;
    if (map.has(query[0]) && map.has(query[1])) {
      const ia = map.get(query[0])!;
      const ib = map.get(query[1])!;
      if (graph[ia][ib] > 0) {
        result = graph[ia][ib];
      }
    }
    ret[i] = result;
  }
  return ret;
}
// @lc code=end
