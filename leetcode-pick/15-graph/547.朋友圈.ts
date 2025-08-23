/*
 * @lc app=leetcode.cn id=547 lang=typescript
 *
 * [547] 朋友圈
 *
 * https://leetcode-cn.com/problems/friend-circles/description/
 *
 * algorithms
 * Medium (57.87%)
 * Likes:    303
 * Dislikes: 0
 * Total Accepted:    60.2K
 * Total Submissions: 104K
 * Testcase Example:  '[[1,1,0],[1,1,0],[0,0,1]]'
 *
 * 班上有 N 名学生。其中有些人是朋友，有些则不是。他们的友谊具有是传递性。如果已知 A 是 B 的朋友，B 是 C 的朋友，那么我们可以认为 A 也是
 * C 的朋友。所谓的朋友圈，是指所有朋友的集合。
 *
 * 给定一个 N * N 的矩阵 M，表示班级中学生之间的朋友关系。如果M[i][j] = 1，表示已知第 i 个和 j
 * 个学生互为朋友关系，否则为不知道。你必须输出所有学生中的已知的朋友圈总数。
 *
 *
 *
 * 示例 1：
 *
 * 输入：
 * [[1,1,0],
 * ⁠[1,1,0],
 * ⁠[0,0,1]]
 * 输出：2
 * 解释：已知学生 0 和学生 1 互为朋友，他们在一个朋友圈。
 * 第2个学生自己在一个朋友圈。所以返回 2 。
 *
 *
 * 示例 2：
 *
 * 输入：
 * [[1,1,0],
 * ⁠[1,1,1],
 * ⁠[0,1,1]]
 * 输出：1
 * 解释：已知学生 0 和学生 1 互为朋友，学生 1 和学生 2 互为朋友，所以学生 0 和学生 2 也是朋友，所以他们三个在一个朋友圈，返回 1
 * 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= N <= 200
 * M[i][i] == 1
 * M[i][j] == M[j][i]
 *
 *
 */

// @lc code=start
/**
 * 并查集 (Union Find) 解决方案
 *
 * 核心思想：将朋友关系建模为图的连通分量，使用并查集合并朋友圈，最后统计连通分量数量
 */
function findCircleNum(M: number[][]): number {
  // 初始化并查集，-1表示自己是根节点
  const parent: number[] = new Array(M.length).fill(-1);

  // 遍历所有朋友关系，合并朋友圈
  for (let i = 0; i < M.length; i++) {
    for (let j = 0; j < M.length; j++) {
      if (M[i][j] === 1 && i !== j) {
        union(parent, i, j);
      }
    }
  }

  // 统计连通分量数量（根节点数量）
  let count = 0;
  for (let i = 0; i < parent.length; i++) {
    if (parent[i] === -1) {
      count++;
    }
  }
  return count;

  /**
   * 合并两个朋友圈
   * @param parent 并查集数组
   * @param i 第一个学生
   * @param j 第二个学生
   */
  function union(parent: number[], i: number, j: number) {
    const x = find(parent, i); // 找到i的根节点
    const y = find(parent, j); // 找到j的根节点
    if (x !== y) {
      parent[x] = y; // 合并两个朋友圈
    }
  }

  /**
   * 查找根节点
   * @param parent 并查集数组
   * @param target 目标学生
   * @returns 根节点
   */
  function find(parent: number[], target: number): number {
    if (parent[target] === -1) {
      return target; // 自己是根节点
    }
    return find(parent, parent[target]); // 递归查找
  }
}

/**
 * 深度优先搜索 (DFS) 解决方案
 *
 * 核心思想：使用DFS遍历每个朋友圈，标记已访问的学生，统计连通分量数量
 */
function findCircleNum2(M: number[][]): number {
  const visited: number[] = new Array(M.length).fill(0); // 访问标记数组
  let count = 0; // 朋友圈数量

  // 遍历所有学生
  for (let i = 0; i < M.length; i++) {
    if (visited[i] === 0) {
      // 如果学生i未访问，开始DFS遍历其朋友圈
      dfs(M, visited, i);
      count++; // 完成一个朋友圈的遍历
    }
  }
  return count;

  /**
   * 深度优先搜索，遍历朋友圈
   * @param M 朋友关系矩阵
   * @param visited 访问标记数组
   * @param i 当前学生
   */
  function dfs(M: number[][], visited: number[], i: number) {
    // 遍历所有学生
    for (let j = 0; j < M.length; j++) {
      // 如果j是i的朋友且j未访问
      if (M[i][j] === 1 && visited[j] === 0) {
        visited[i] = 1; // 标记i为已访问
        dfs(M, visited, j); // 递归访问j的朋友圈
      }
    }
  }
}

/**
 * 广度优先搜索 (BFS) 解决方案
 *
 * 核心思想：使用BFS遍历每个朋友圈，使用队列进行层序遍历
 */
function findCircleNum3(M: number[][]): number {
  const visited: number[] = new Array(M.length).fill(0); // 访问标记数组
  let count = 0; // 朋友圈数量
  const queue: number[] = []; // BFS队列

  // 遍历所有学生
  for (let i = 0; i < M.length; i++) {
    if (visited[i] === 0) {
      // 如果学生i未访问，开始BFS遍历其朋友圈
      queue.push(i);

      // BFS主循环
      while (queue.length) {
        const s = queue.shift()!; // 取出当前学生
        visited[s] = 1; // 标记为已访问

        // 遍历所有学生，找到s的朋友
        for (let j = 0; j < M.length; j++) {
          if (M[s][j] === 1 && visited[j] === 0) {
            queue.push(j); // 将朋友加入队列
          }
        }
      }
      count++; // 完成一个朋友圈的遍历
    }
  }

  return count;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 计算无向图中连通分量的数量
   - 朋友关系具有传递性：A->B, B->C => A->C
   - 等价于：求图的连通分量数量

2. 算法分析：
   - 时间复杂度：O(n²)，其中n是学生数量
     * 需要遍历整个邻接矩阵
     * 并查集操作接近O(1)
     * DFS/BFS每个节点最多访问一次
   - 空间复杂度：O(n)，并查集数组或访问数组
   - 算法类型：并查集 / 深度优先搜索 / 广度优先搜索

3. 三种解法的比较：
   - 并查集：适合处理动态连通性问题
   - DFS：递归实现，代码简洁
   - BFS：迭代实现，避免栈溢出

4. 并查集实现要点：
   - 初始化：每个学生是自己的根节点
   - 合并操作：将朋友关系合并到同一集合
   - 统计结果：根节点数量即为朋友圈数量
   - 路径压缩：优化查找效率

5. DFS实现要点：
   - 访问标记：避免重复访问
   - 递归遍历：深度优先访问朋友
   - 连通分量：每次DFS完成一个朋友圈
   - 计数：每次开始新的DFS时计数加1

6. BFS实现要点：
   - 队列管理：使用队列进行层序遍历
   - 访问标记：避免重复访问
   - 朋友查找：遍历邻接矩阵找到朋友
   - 连通分量：每次BFS完成一个朋友圈

7. 关键技巧：
   - 传递性：利用朋友关系的传递性
   - 访问标记：避免重复计算
   - 矩阵对称性：M[i][j] = M[j][i]
   - 自环处理：M[i][i] = 1（自己和自己）

8. 算法步骤（并查集）：
   - 初始化并查集
   - 遍历朋友关系矩阵
   - 合并朋友关系
   - 统计根节点数量

9. 算法步骤（DFS/BFS）：
   - 初始化访问数组
   - 遍历所有学生
   - 对未访问学生进行搜索
   - 统计连通分量数量

10. 类似问题：
    - 岛屿数量 (200)
    - 相似字符串组 (839)
    - 任何需要计算连通分量的问题
    - 图的连通性问题

11. 算法优势：
    - 并查集：适合动态连通性
    - DFS：代码简洁，易于理解
    - BFS：避免栈溢出，适合大规模数据
    - 时间复杂度可控，适合处理图问题

12. 边界情况处理：
    - 单个学生：返回1
    - 所有学生都是朋友：返回1
    - 没有朋友关系：返回学生数量
    - 部分朋友关系：正常处理
*/
