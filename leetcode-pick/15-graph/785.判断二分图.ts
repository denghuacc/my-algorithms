/*
 * @lc app=leetcode.cn id=785 lang=typescript
 *
 * [785] 判断二分图
 *
 * https://leetcode-cn.com/problems/is-graph-bipartite/description/
 *
 * algorithms
 * Medium (33.94%)
 * Likes:    93
 * Dislikes: 0
 * Total Accepted:    9.8K
 * Total Submissions: 21K
 * Testcase Example:  '[[1,3],[0,2],[1,3],[0,2]]'
 *
 * 给定一个无向图graph，当这个图为二分图时返回true。
 *
 * 如果我们能将一个图的节点集合分割成两个独立的子集A和B，并使图中的每一条边的两个节点一个来自A集合，一个来自B集合，我们就将这个图称为二分图。
 *
 *
 * graph将会以邻接表方式给出，graph[i]表示图中与节点i相连的所有节点。每个节点都是一个在0到graph.length-1之间的整数。这图中没有自环和平行边：
 * graph[i] 中不存在i，并且graph[i]中没有重复的值。
 *
 *
 *
 * 示例 1:
 * 输入: [[1,3], [0,2], [1,3], [0,2]]
 * 输出: true
 * 解释:
 * 无向图如下:
 * 0----1
 * |    |
 * |    |
 * 3----2
 * 我们可以将节点分成两组: {0, 2} 和 {1, 3}。
 *
 *
 *
 *
 * 示例 2:
 * 输入: [[1,2,3], [0,2], [0,1,3], [0,2]]
 * 输出: false
 * 解释:
 * 无向图如下:
 * 0----1
 * | \  |
 * |  \ |
 * 3----2
 * 我们不能将节点分割成两个独立的子集。
 *
 *
 * 注意:
 *
 *
 * graph 的长度范围为 [1, 100]。
 * graph[i] 中的元素的范围为 [0, graph.length - 1]。
 * graph[i] 不会包含 i 或者有重复的值。
 * 图是无向的: 如果j 在 graph[i]里边, 那么 i 也会在 graph[j]里边。
 *
 *
 */

// @lc code=start
/**
 * 深度优先搜索 (DFS) 解决方案
 *
 * 核心思想：使用两种颜色对图进行着色，相邻节点必须使用不同颜色，如果能成功着色则为二分图
 */
function isBipartite(graph: number[][]): boolean {
  const UNCOLORED = 0; // 未着色
  const RED = 1; // 红色
  const GREEN = 2; // 绿色

  const n = graph.length;
  const colors: number[] = new Array(n).fill(UNCOLORED); // 记录每个节点的颜色
  let valid = true; // 标记是否能成功着色

  // 遍历所有节点，对未着色的节点进行DFS着色
  for (let i = 0; i < n && valid; i++) {
    if (colors[i] === UNCOLORED) {
      dfs(i, RED, graph);
    }
  }

  return valid;

  /**
   * 深度优先搜索着色函数
   * @param node 当前节点
   * @param color 当前节点应该着色的颜色
   * @param graph 图的邻接表
   */
  function dfs(node: number, color: number, graph: number[][]) {
    colors[node] = color; // 给当前节点着色
    const cNei = color === RED ? GREEN : RED; // 邻居节点应该着相反的颜色

    // 遍历所有邻居节点
    for (const neighbor of graph[node]) {
      if (colors[neighbor] === UNCOLORED) {
        // 如果邻居未着色，递归着色
        dfs(neighbor, cNei, graph);
        if (!valid) return; // 如果发现冲突，提前返回
      } else if (colors[neighbor] !== cNei) {
        // 如果邻居已着色但颜色不对，说明不是二分图
        valid = false;
        return;
      }
    }
  }
}

/**
 * 广度优先搜索 (BFS) 解决方案
 *
 * 核心思想：使用BFS进行层序遍历，逐层交替着色，检查是否存在颜色冲突
 */
function isBipartite2(graph: number[][]): boolean {
  const UNCOLORED = 0; // 未着色
  const RED = 1; // 红色
  const GREEN = 2; // 绿色

  const n = graph.length;
  const colors: number[] = new Array(n).fill(UNCOLORED); // 记录每个节点的颜色

  // 遍历所有节点，对未着色的节点进行BFS着色
  for (let i = 0; i < n; i++) {
    if (colors[i] === UNCOLORED) {
      const queue: number[] = []; // BFS队列
      queue.push(i);
      colors[i] = RED; // 从红色开始着色

      // BFS主循环
      while (queue.length) {
        const node = queue.shift()!;
        const cNei = colors[node] === RED ? GREEN : RED; // 邻居应该着相反的颜色

        // 遍历所有邻居节点
        for (const neighbor of graph[node]) {
          if (colors[neighbor] === UNCOLORED) {
            // 如果邻居未着色，加入队列并着色
            queue.push(neighbor);
            colors[neighbor] = cNei;
          } else if (colors[neighbor] !== cNei) {
            // 如果邻居已着色但颜色不对，说明不是二分图
            return false;
          }
        }
      }
    }
  }

  return true; // 所有节点都成功着色，是二分图
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断一个无向图是否可以二着色
   - 二分图定义：节点可以分成两组，组内无边，组间有边
   - 等价于：图是否可以用两种颜色着色，相邻节点颜色不同

2. 算法分析：
   - 时间复杂度：O(V + E)，其中V是节点数，E是边数
     * 每个节点和每条边最多访问一次
     * DFS/BFS遍历整个图
   - 空间复杂度：O(V)，颜色数组和递归栈/队列
   - 算法类型：深度优先搜索 (DFS) / 广度优先搜索 (BFS)

3. 实现要点：
   - 使用两种颜色交替着色
   - 相邻节点必须使用不同颜色
   - 发现颜色冲突立即返回false
   - 处理不连通图：遍历所有连通分量

4. 两种解法的比较：
   - DFS：递归实现，代码简洁，可能栈溢出
   - BFS：迭代实现，避免栈溢出，适合大型图

5. 关键技巧：
   - 颜色交替：当前节点颜色确定后，邻居必须着相反颜色
   - 冲突检测：发现邻居颜色与期望不符时立即返回false
   - 连通分量处理：对每个未着色节点开始新的着色过程

6. 算法步骤：
   - 初始化：创建颜色数组，所有节点未着色
   - 遍历节点：对每个未着色节点开始着色
   - 着色过程：DFS/BFS遍历，交替着色
   - 冲突检查：发现颜色冲突立即返回false

7. 二分图的判定条件：
   - 图中不存在奇数长度的环
   - 等价于：可以用两种颜色着色
   - 等价于：图的着色数为2

8. 类似问题：
   - 可能的二分法 (886)
   - 课程表 (207)
   - 任何需要图着色的问题
   - 检测图中是否存在奇数环

9. 算法优势：
   - 时间复杂度线性，效率高
   - 代码简洁，易于实现
   - 可以处理不连通图
   - 提前返回，避免不必要的计算

10. 边界情况处理：
    - 空图：返回true
    - 单节点图：返回true
    - 不连通图：每个连通分量分别处理
    - 自环：直接返回false（题目保证无自环）
*/
