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
 * 二维动态规划解法
 * 核心思想：dp[i][j]表示从顶部到位置(i,j)的最小路径和
 */
var minimumTotal = function (triangle: number[][]): number {
  const n = triangle.length;

  // dp[i][j] 表示从三角形顶部走到位置 (i,j) 的最小路径和
  const dp: number[][] = Array.from(new Array(n), () => new Array(n).fill(0));
  // 初始化起点
  dp[0][0] = triangle[0][0];

  for (let i = 1; i < n; i++) {
    // 处理每行的第一个元素：只能从上一行的第一个元素到达
    dp[i][0] = dp[i - 1][0] + triangle[i][0];

    // 处理每行的中间元素：可以从上一行的相邻两个元素到达
    for (let j = 1; j < i; j++) {
      dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
    }

    // 处理每行的最后一个元素：只能从上一行的最后一个元素到达
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
  }

  // 找到最后一行的最小路径和
  let minTotal = dp[n - 1][0];
  for (let i = 1; i < n; i++) {
    minTotal = Math.min(minTotal, dp[n - 1][i]);
  }

  return minTotal;
};

/**
 * 空间优化解法1：使用两行数组
 * 核心思想：只保存当前行和上一行的状态
 */
var minimumTotal = function (triangle: number[][]): number {
  const n = triangle.length;

  // 只使用两行数组，交替使用
  const dp: number[][] = Array.from(new Array(2), () => new Array(n).fill(0));
  dp[0][0] = triangle[0][0];

  for (let i = 1; i < n; i++) {
    const cur = i % 2; // 当前行
    const pre = 1 - cur; // 上一行

    // 处理每行的第一个元素
    dp[cur][0] = dp[pre][0] + triangle[i][0];

    // 处理每行的中间元素
    for (let j = 1; j < i; j++) {
      dp[cur][j] = Math.min(dp[pre][j - 1], dp[pre][j]) + triangle[i][j];
    }

    // 处理每行的最后一个元素
    dp[cur][i] = dp[pre][i - 1] + triangle[i][i];
  }

  // 找到最后一行的最小路径和
  let minTotal = dp[(n - 1) % 2][0];
  for (let i = 1; i < n; i++) {
    minTotal = Math.min(minTotal, dp[(n - 1) % 2][i]);
  }

  return minTotal;
};

/**
 * 空间优化解法2：使用单行数组
 * 核心思想：直接在原数组上更新，从后往前避免覆盖
 */
var minimumTotal = function (triangle: number[][]): number {
  const n = triangle.length;

  // 只使用一行数组
  const dp: number[] = new Array(n).fill(0);
  dp[0] = triangle[0][0];

  for (let i = 1; i < n; i++) {
    // 处理每行的最后一个元素（从后往前避免覆盖）
    dp[i] = dp[i - 1] + triangle[i][i];

    // 处理每行的中间元素（从后往前避免覆盖）
    for (let j = i - 1; j > 0; j--) {
      dp[j] = Math.min(dp[j - 1], dp[j]) + triangle[i][j];
    }

    // 处理每行的第一个元素
    dp[0] += triangle[i][0];
  }

  // 找到最后一行的最小路径和
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
   - 在三角形中从顶部到底部找最小路径和
   - 每一步只能移动到下一行相邻的节点
   - 相邻节点：下标相同或下标+1

2. 算法分析：
   - 时间复杂度：O(n²)，其中n是三角形的行数
   - 空间复杂度：O(n²)（二维）或O(n)（优化版本）
   - 算法类型：动态规划

3. 实现要点：
   - 状态定义：dp[i][j]表示从顶部到位置(i,j)的最小路径和
   - 状态转移：
     * dp[i][0] = dp[i-1][0] + triangle[i][0]（第一个元素）
     * dp[i][j] = min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]（中间元素）
     * dp[i][i] = dp[i-1][i-1] + triangle[i][i]（最后一个元素）
   - 边界条件：dp[0][0] = triangle[0][0]

4. 优化思路：
   - 空间优化1：使用两行数组交替使用
   - 空间优化2：使用单行数组，从后往前更新
   - 滚动数组：避免保存整个二维数组

5. 边界情况：
   - 三角形只有一行：直接返回triangle[0][0]
   - 三角形只有两行：简单计算
   - 大三角形的数值溢出问题

6. 类似问题：
   - 最小路径和（矩形网格）
   - 不同路径
   - 其他路径问题

7. 关键洞察：
   - 每个位置的最小路径和只依赖于上一行的相邻位置
   - 可以使用滚动数组优化空间复杂度
   - 从后往前更新避免覆盖问题

8. 示例分析：
   triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
   - dp[0][0] = 2
   - dp[1][0] = 5, dp[1][1] = 6
   - dp[2][0] = 11, dp[2][1] = 10, dp[2][2] = 13
   - dp[3][0] = 15, dp[3][1] = 11, dp[3][2] = 18, dp[3][3] = 16
   - 最小路径和：11 (2→3→5→1)

9. 复杂度对比：
   - 二维dp：思路清晰，空间复杂度O(n²)
   - 两行优化：空间复杂度O(2n)
   - 单行优化：空间复杂度O(n)，最优

10. 状态转移理解：
    - 对于位置(i,j)，可以从位置(i-1,j-1)或(i-1,j)到达
    - 选择路径和较小的那个，再加上当前位置的值
    - 边界位置只能从一个方向到达
*/
