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
/**
 * Floyd-Warshall 算法解决方案
 *
 * 核心思想：将变量之间的关系建模为有向图，使用Floyd算法计算所有变量对之间的比值
 */
function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  let count = 0; // 变量计数器
  const map: Map<string, number> = new Map(); // 变量名到索引的映射
  const eLen = equations.length;

  // 第一步：为所有变量分配索引
  for (let i = 0; i < eLen; i++) {
    if (!map.has(equations[i][0])) {
      map.set(equations[i][0], count++);
    }
    if (!map.has(equations[i][1])) {
      map.set(equations[i][1], count++);
    }
  }

  // 第二步：初始化邻接矩阵，-1表示不可达
  const graph: number[][] = Array.from(new Array(count), () =>
    new Array(count).fill(-1.0)
  );

  // 第三步：填充已知的比值关系
  for (let i = 0; i < eLen; i++) {
    const va = map.get(equations[i][0])!; // 变量a的索引
    const vb = map.get(equations[i][1])!; // 变量b的索引
    graph[va][vb] = values[i]; // a / b = values[i]
    graph[vb][va] = 1.0 / values[i]; // b / a = 1 / values[i]
  }

  // 第四步：Floyd算法，计算所有变量对之间的比值
  for (let k = 0; k < count; k++) {
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        // 如果i->k和k->j都有路径，则i->j的路径为i->k->j
        if (graph[i][k] > 0 && graph[k][j] > 0) {
          graph[i][j] = graph[i][k] * graph[k][j];
        }
      }
    }
  }

  // 第五步：处理查询
  const qLen = queries.length;
  const ret: number[] = [];
  for (let i = 0; i < qLen; i++) {
    const query = queries[i];
    let result = -1.0; // 默认不可达

    // 检查两个变量是否都存在
    if (map.has(query[0]) && map.has(query[1])) {
      const ia = map.get(query[0])!; // 变量a的索引
      const ib = map.get(query[1])!; // 变量b的索引

      // 如果存在路径，返回比值
      if (graph[ia][ib] > 0) {
        result = graph[ia][ib];
      }
    }
    ret[i] = result;
  }
  return ret;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将变量之间的关系建模为有向加权图
   - 每个变量是一个节点，比值是边的权重
   - 需要计算任意两个变量之间的比值
   - 等价于：在有向图中寻找两点间的路径权重

2. 算法分析：
   - 时间复杂度：O(n³)，其中n是变量的数量
     * Floyd算法三重循环：O(n³)
     * 预处理和查询：O(n² + q)，q是查询数量
   - 空间复杂度：O(n²)，邻接矩阵
   - 算法类型：Floyd-Warshall 算法

3. 实现要点：
   - 变量映射：将字符串变量名映射为数字索引
   - 邻接矩阵：使用二维数组存储所有变量对之间的比值
   - Floyd算法：通过中间节点计算所有路径
   - 查询处理：直接查表获取结果

4. 算法步骤：
   - 变量索引化：为每个变量分配唯一索引
   - 图构建：根据已知等式构建邻接矩阵
   - 全源最短路：使用Floyd算法计算所有路径
   - 查询处理：直接查表返回结果

5. 关键技巧：
   - 双向边：a/b = x 意味着 b/a = 1/x
   - 传递性：a/b * b/c = a/c
   - 不可达标记：使用-1表示无法计算比值
   - 字符串映射：使用Map提高查找效率

6. Floyd算法原理：
   - 三重循环：k, i, j
   - 核心思想：通过中间节点k更新i到j的路径
   - 条件：i->k和k->j都存在路径
   - 更新：graph[i][j] = graph[i][k] * graph[k][j]

7. 边界情况处理：
   - 变量不存在：返回-1
   - 变量相同：返回1（自己除以自己）
   - 无路径可达：返回-1
   - 除数为0：题目保证不会出现

8. 类似问题：
   - 最短路径问题
   - 传递闭包问题
   - 图的可达性问题
   - 任何需要计算全源路径的问题

9. 算法优势：
   - 一次性计算所有路径，查询时O(1)
   - 处理传递关系：a/b * b/c = a/c
   - 代码简洁，易于实现
   - 适合处理稠密图

10. 优化思路：
    - 使用邻接表代替邻接矩阵（稀疏图）
    - 使用Union-Find处理连通性
    - 使用DFS/BFS处理单次查询
    - 记忆化搜索避免重复计算

11. 复杂度分析：
    - 预处理：O(n³)时间，O(n²)空间
    - 查询：O(1)时间
    - 总体：适合查询次数多的情况
*/
