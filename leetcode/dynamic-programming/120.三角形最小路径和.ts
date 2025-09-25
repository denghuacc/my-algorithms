/*
 * @lc app=leetcode.cn id=120 lang=typescript
 *
 * [120] 三角形最小路径和
 *
 * https://leetcode-cn.com/problems/triangle/description/
 *
 * algorithms
 * Medium (55.81%)
 * Likes:    448
 * Dislikes: 0
 * Total Accepted:    69.3K
 * Total Submissions: 106K
 * Testcase Example:  '[[2],[3,4],[6,5,7],[4,1,8,3]]'
 *
 * 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。
 *
 * 相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。
 *
 *
 *
 * 例如，给定三角形：
 *
 * [
 * ⁠    [2],
 * ⁠   [3,4],
 * ⁠  [6,5,7],
 * ⁠ [4,1,8,3]
 * ]
 *
 *
 * 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
 *
 *
 *
 * 说明：
 *
 * 如果你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题，那么你的算法会很加分。
 *
 */

// @lc code=start
/**
 * 解法一：二维DP（基础版本）
 * 时间复杂度：O(n²)，空间复杂度：O(n²)
 * 最直观的解法，适合理解动态规划的基本思想
 */
// dp
var minimumTotal = function (triangle: number[][]): number {
  const n = triangle.length;

  // dp[i][j] -> 三角形顶部走到位置 (i,j) 的最小路径和
  const dp: number[][] = Array.from(new Array(n), () => new Array(n).fill(0));

  // 1. 初始化：顶部元素的最小路径和就是它本身
  dp[0][0] = triangle[0][0];

  // 2. 填充DP数组：从第二行开始逐行计算
  for (let i = 1; i < n; i++) {
    // 3. 处理每行的第一个元素：只能从上一行的第一个元素到达
    dp[i][0] = dp[i - 1][0] + triangle[i][0];

    // 4. 处理每行的中间元素：可以从上一行的相邻两个元素到达
    for (let j = 1; j < i; j++) {
      dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
    }

    // 5. 处理每行的最后一个元素：只能从上一行的最后一个元素到达
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
  }

  // 6. 找到最后一行中的最小路径和
  let minTotal = dp[n - 1][0];

  for (let i = 1; i < n; i++) {
    minTotal = Math.min(minTotal, dp[n - 1][i]);
  }

  return minTotal;
};

/**
 * 解法二：滚动数组优化（空间复杂度 O(2N)）
 * 时间复杂度：O(n²)，空间复杂度：O(2n)
 * 使用两个一维数组交替存储，减少空间使用
 */
// dp2 optimization 空间复杂度 O(2N)
var minimumTotal = function (triangle: number[][]): number {
  const n = triangle.length;

  // 使用两个一维数组交替存储当前行和上一行的DP值
  const dp: number[][] = Array.from(new Array(2), () => new Array(n).fill(0));
  dp[0][0] = triangle[0][0];

  for (let i = 1; i < n; i++) {
    // 计算当前行和上一行的索引
    const cur = i % 2; // 当前行索引
    const pre = 1 - cur; // 上一行索引

    // 处理每行的第一个元素
    dp[cur][0] = dp[pre][0] + triangle[i][0];

    // 处理每行的中间元素
    for (let j = 1; j < i; j++) {
      dp[cur][j] = Math.min(dp[pre][j - 1], dp[pre][j]) + triangle[i][j];
    }

    // 处理每行的最后一个元素
    dp[cur][i] = dp[pre][i - 1] + triangle[i][i];
  }

  // 找到最后一行中的最小路径和
  let minTotal = dp[(n - 1) % 2][0];

  for (let i = 1; i < n; i++) {
    minTotal = Math.min(minTotal, dp[(n - 1) % 2][i]);
  }

  return minTotal;
};

/**
 * 解法三：一维DP优化（空间复杂度 O(N)）
 * 时间复杂度：O(n²)，空间复杂度：O(n)
 * 最优空间复杂度解法，符合题目要求
 */
// dp2 optimization 空间复杂度 O(N)
var minimumTotal = function (triangle: number[][]): number {
  const n = triangle.length;

  // 使用一维数组存储DP值
  const dp: number[] = new Array(n).fill(0);
  dp[0] = triangle[0][0];

  for (let i = 1; i < n; i++) {
    // 7. 先处理每行的最后一个元素：只能从上一行的最后一个元素到达
    // 这样做是为了避免在从右到左更新时覆盖还需要使用的值
    dp[i] = dp[i - 1] + triangle[i][i];

    // 8. 从右到左处理中间元素：避免覆盖还需要使用的值
    for (let j = i - 1; j > 0; j--) {
      dp[j] = Math.min(dp[j - 1], dp[j]) + triangle[i][j];
    }

    // 9. 最后处理每行的第一个元素：只能从上一行的第一个元素到达
    dp[0] += triangle[i][0];
  }

  // 找到最小路径和
  let minTotal = dp[0];

  for (let i = 1; i < n; i++) {
    minTotal = Math.min(minTotal, dp[i]);
  }

  return minTotal;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在三角形网格中寻找从顶部到底部的最小路径和
   - 每一步只能移动到下一行相邻的节点（索引为i或i+1）
   - 需要找到所有可能路径中的最小和

2. 算法分析：
   - 时间复杂度：O(n²) - 需要遍历三角形的每个位置
   - 空间复杂度：
     * 解法一：O(n²) - 二维DP数组
     * 解法二：O(2n) - 两个一维数组
     * 解法三：O(n) - 一个一维数组
   - 算法类型：动态规划

3. 解题思路：
   - 核心思想：动态规划，自顶向下计算每个位置的最小路径和
   - 状态定义：dp[i][j] 表示从顶部到位置(i,j)的最小路径和
   - 状态转移：dp[i][j] = min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]
   - 边界条件：每行的第一个和最后一个元素只有一种到达方式

4. 实现要点：
   - 数据结构选择：
     * 解法一：二维数组，直观易懂
     * 解法二：滚动数组，空间优化
     * 解法三：一维数组，最优空间复杂度
   - 边界条件处理：
     * 第一行：dp[0][0] = triangle[0][0]
     * 每行第一个：dp[i][0] = dp[i-1][0] + triangle[i][0]
     * 每行最后一个：dp[i][i] = dp[i-1][i-1] + triangle[i][i]
   - 空间优化技巧：
     * 滚动数组：只保留当前行和上一行
     * 一维数组：从右到左更新，避免覆盖

5. 示例分析：
   三角形：[[2],[3,4],[6,5,7],[4,1,8,3]]
   
   解法一DP表：
   [2]
   [5, 6]
   [11, 10, 13]
   [15, 11, 18, 16]
   
   最小路径：2 → 3 → 5 → 1 = 11

6. 空间优化原理：
   - 滚动数组：当前行只依赖上一行，可以用两个数组交替
   - 一维数组：从右到左更新，确保更新dp[j]时dp[j-1]还是上一行的值
   - 关键观察：dp[i][j]只依赖dp[i-1][j-1]和dp[i-1][j]

7. 常见陷阱：
   - 边界处理：每行的第一个和最后一个元素需要特殊处理
   - 空间优化：一维数组必须从右到左更新
   - 索引计算：注意三角形每行的长度是i+1
   - 初始化：确保DP数组正确初始化

8. 扩展思考：
   - 类似问题：最小路径和、最大路径和、路径计数
   - 算法变种：自底向上DP、记忆化递归
   - 实际应用：游戏路径规划、网络路由优化
   - 优化方向：并行计算、GPU加速

9. 性能对比：
   - 解法一：最直观，适合理解和调试
   - 解法二：空间优化，适合内存受限环境
   - 解法三：最优空间复杂度，适合大规模数据

10. 数学原理：
    - 最优子结构：全局最优解包含局部最优解
    - 无后效性：当前状态只依赖前一状态
    - 状态转移：基于相邻节点的最小路径选择
    - 贝尔曼方程：V(i,j) = min(V(i-1,j-1), V(i-1,j)) + triangle[i][j]
*/
