/*
 * @lc app=leetcode.cn id=210 lang=typescript
 *
 * [210] 课程表 II
 *
 * https://leetcode-cn.com/problems/course-schedule-ii/description/
 *
 * algorithms
 * Medium (44.27%)
 * Likes:    228
 * Dislikes: 0
 * Total Accepted:    39.9K
 * Total Submissions: 78.4K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 现在你总共有 n 门课需要选，记为 0 到 n-1。
 *
 * 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]
 *
 * 给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。
 *
 * 可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。
 *
 * 示例 1:
 *
 * 输入: 2, [[1,0]]
 * 输出: [0,1]
 * 解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
 *
 * 示例 2:
 *
 * 输入: 4, [[1,0],[2,0],[3,1],[3,2]]
 * 输出: [0,1,2,3] or [0,2,1,3]
 * 解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
 * 因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
 *
 *
 * 说明:
 *
 *
 * 输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。详情请参见图的表示法。
 * 你可以假定输入的先决条件中没有重复的边。
 *
 *
 * 提示:
 *
 *
 * 这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
 * 通过 DFS 进行拓扑排序 - 一个关于Coursera的精彩视频教程（21分钟），介绍拓扑排序的基本概念。
 *
 * 拓扑排序也可以通过 BFS 完成。
 *
 *
 *
 */

// @lc code=start
/**
 * 深度优先搜索 (DFS) 拓扑排序解决方案
 *
 * 核心思想：使用DFS进行拓扑排序，检测环的存在，如果存在环则无法完成所有课程
 */
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  // 构建邻接表，edges[i]表示课程i的所有后续课程
  const edges: number[][] = Array.from(new Array(numCourses), () =>
    new Array(numCourses).fill(Infinity)
  );

  // 访问状态：0=未访问，1=访问中，2=已访问
  const visited: number[] = new Array(numCourses).fill(0);

  const result: number[] = []; // 存储拓扑排序结果
  let invalid = false; // 标记是否存在环

  // 构建图：prerequisites[i] = [a, b] 表示学习a之前需要先学习b
  for (const cp of prerequisites) {
    edges[cp[1]].push(cp[0]); // b -> a
  }

  // 对每个未访问的节点进行DFS
  for (let i = 0; i < numCourses && !invalid; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  // 如果存在环，返回空数组
  if (invalid) return [];

  // 返回拓扑排序结果（需要反转，因为DFS是后序遍历）
  return result.reverse();

  /**
   * 深度优先搜索函数
   * @param u 当前访问的课程
   */
  function dfs(u: number) {
    visited[u] = 1; // 标记为访问中

    // 访问所有后续课程
    for (const v of edges[u]) {
      if (visited[v] === 0) {
        // 如果邻居未访问，递归访问
        dfs(v);
        if (invalid) return;
      } else if (visited[v] === 1) {
        // 如果邻居正在访问中，说明存在环
        invalid = true;
        return;
      }
    }

    visited[u] = 2; // 标记为已访问
    result.push(u); // 加入结果数组（后序遍历）
  }
}

/**
 * 广度优先搜索 (BFS) 拓扑排序解决方案
 *
 * 核心思想：使用BFS进行拓扑排序，从入度为0的节点开始，逐步移除节点
 */
function findOrder2(numCourses: number, prerequisites: number[][]): number[] {
  // 构建邻接表
  const edges: number[][] = Array.from(new Array(numCourses), () =>
    new Array(numCourses).fill(Infinity)
  );

  // 入度数组，indegree[i]表示课程i的入度
  const indegree: number[] = new Array(numCourses).fill(0);

  const result: number[] = []; // 存储拓扑排序结果
  const queue: number[] = []; // BFS队列

  // 构建图并计算入度
  for (const cp of prerequisites) {
    edges[cp[1]].push(cp[0]); // b -> a
    indegree[cp[0]] += 1; // a的入度加1
  }

  // 将所有入度为0的节点加入队列
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  // BFS主循环
  while (queue.length) {
    const u = queue.shift()!; // 取出一个入度为0的节点
    result.push(u); // 加入结果数组

    // 移除节点u，更新其所有邻居的入度
    for (const v of edges[u]) {
      indegree[v] -= 1; // 邻居的入度减1
      if (indegree[v] === 0) {
        // 如果邻居的入度变为0，加入队列
        queue.push(v);
      }
    }
  }

  // 如果结果数组长度不等于课程数量，说明存在环
  if (result.length !== numCourses) return [];

  return result;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在有向图中寻找拓扑排序
   - 检测图中是否存在环
   - 如果存在环，无法完成所有课程
   - 等价于：课程依赖关系的有向无环图(DAG)的拓扑排序

2. 算法分析：
   - 时间复杂度：O(V + E)，其中V是课程数量，E是依赖关系数量
     * 每个节点和每条边最多访问一次
   - 空间复杂度：O(V + E)，邻接表和访问数组
   - 算法类型：拓扑排序 (DFS/BFS)

3. 两种解法的比较：
   - DFS：递归实现，可以检测环
   - BFS：迭代实现，使用入度数组

4. DFS实现要点：
   - 三种状态：未访问(0)、访问中(1)、已访问(2)
   - 环检测：访问中状态遇到访问中状态说明存在环
   - 后序遍历：DFS完成后序遍历，需要反转结果
   - 递归实现：对每个未访问节点进行DFS

5. BFS实现要点：
   - 入度数组：记录每个节点的入度
   - 队列管理：从入度为0的节点开始
   - 逐步移除：移除节点后更新邻居入度
   - 环检测：最终结果长度不等于节点数量

6. 关键技巧：
   - 图构建：prerequisites[i] = [a, b] 表示 b -> a
   - 环检测：DFS使用三种状态，BFS检查结果长度
   - 拓扑排序：确保依赖关系得到满足
   - 结果处理：DFS需要反转，BFS直接返回

7. 算法步骤（DFS）：
   - 构建邻接表
   - 对每个未访问节点进行DFS
   - 检测环的存在
   - 返回拓扑排序结果

8. 算法步骤（BFS）：
   - 构建邻接表和入度数组
   - 将所有入度为0的节点加入队列
   - BFS移除节点，更新入度
   - 检查是否完成所有节点

9. 为什么需要检测环：
   - 如果存在环，无法确定学习顺序
   - 环意味着循环依赖，无法完成所有课程
   - 拓扑排序只适用于有向无环图

10. 类似问题：
    - 课程表 (207)
    - 判断二分图 (785)
    - 任何需要拓扑排序的问题
    - 检测有向图中是否存在环

11. 算法优势：
    - 时间复杂度线性，效率高
    - 可以检测环的存在
    - 保证找到正确的学习顺序
    - 适合处理依赖关系问题

12. 边界情况处理：
    - 无依赖关系：任意顺序都可以
    - 存在环：返回空数组
    - 单个课程：直接返回
    - 多个正确顺序：返回其中一个

13. 复杂度分析：
    - 图构建：O(E)时间
    - DFS/BFS：O(V + E)时间
    - 总体：O(V + E)时间，O(V + E)空间
    - 适合处理大规模依赖关系

14. 应用场景：
    - 课程安排
    - 任务调度
    - 编译顺序
    - 任何有依赖关系的排序问题
*/
