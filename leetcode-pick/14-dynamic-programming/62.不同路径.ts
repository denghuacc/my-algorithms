/*
 * @lc app=leetcode.cn id=62 lang=typescript
 *
 * [62] 不同路径
 *
 * https://leetcode-cn.com/problems/unique-paths/description/
 *
 * algorithms
 * Medium (51.92%)
 * Likes:    576
 * Dislikes: 0
 * Total Accepted:    113.2K
 * Total Submissions: 186.5K
 * Testcase Example:  '3\n2'
 *
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 *
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 *
 * 问总共有多少条不同的路径？
 *
 *
 *
 * 例如，上图是一个7 x 3 的网格。有多少可能的路径？
 *
 *
 *
 * 示例 1:
 *
 * 输入: m = 3, n = 2
 * 输出: 3
 * 解释:
 * 从左上角开始，总共有 3 条路径可以到达右下角。
 * 1. 向右 -> 向右 -> 向下
 * 2. 向右 -> 向下 -> 向右
 * 3. 向下 -> 向右 -> 向右
 *
 *
 * 示例 2:
 *
 * 输入: m = 7, n = 3
 * 输出: 28
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= m, n <= 100
 * 题目数据保证答案小于等于 2 * 10 ^ 9
 *
 *
 */

// @lc code=start
/**
 * 二维动态规划解法
 * 核心思想：每个位置的路径数等于上方和左方路径数之和
 */
var uniquePaths = function (m: number, n: number): number {
  // dp[i][j] 表示到达位置 (i,j) 的不同路径数
  const dp: number[][] = new Array(m).fill(0).map(() => new Array(n).fill(0));

  // 初始化第一行：只能向右移动，所以每个位置路径数为1
  for (let i = 0; i < n; i++) dp[0][i] = 1;

  // 初始化第一列：只能向下移动，所以每个位置路径数为1
  for (let i = 0; i < m; i++) dp[i][0] = 1;

  // 填充dp数组：每个位置的路径数 = 上方路径数 + 左方路径数
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};

/**
 * 空间优化解法1：使用两行数组
 * 核心思想：只保存当前行和前一行，节省空间
 */
var uniquePaths = function (m: number, n: number): number {
  // pre保存前一行的状态，cur保存当前行的状态
  let pre: number[] = new Array(n).fill(1);
  const cur: number[] = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 当前值 = 左方值 + 上方值
      cur[j] = cur[j - 1] + pre[j];
    }
    // 更新pre为当前行，准备下一轮计算
    pre = cur.slice();
  }
  return pre[n - 1];
};

/**
 * 空间优化解法2：使用单行数组
 * 核心思想：直接在原数组上更新，进一步节省空间
 */
var uniquePaths = function (m: number, n: number): number {
  // 只使用一行数组，初始化为1
  const cur: number[] = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // cur[j] += cur[j-1] 等价于 cur[j] = cur[j] + cur[j-1]
      // 其中cur[j]是上方值，cur[j-1]是左方值
      cur[j] += cur[j - 1];
    }
  }
  return cur[n - 1];
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在m×n网格中，从左上角到右下角的不同路径数
   - 每次只能向右或向下移动一步
   - 求所有可能的路径数量

2. 算法分析：
   - 时间复杂度：O(m*n)
   - 空间复杂度：O(m*n)（二维）或O(n)（一维优化）
   - 算法类型：动态规划

3. 实现要点：
   - 状态定义：dp[i][j]表示到达位置(i,j)的不同路径数
   - 状态转移：dp[i][j] = dp[i-1][j] + dp[i][j-1]
   - 边界条件：第一行和第一列的所有位置路径数为1
   - 初始条件：dp[0][0] = 1（起点）

4. 优化思路：
   - 空间优化1：使用两行数组代替二维数组
   - 空间优化2：使用单行数组，直接在原数组上更新
   - 数学解法：可以使用组合数学公式 C(m+n-2, m-1)

5. 边界情况：
   - 1×1网格：只有1条路径
   - 1×n或m×1网格：只有1条路径
   - 大网格的数值溢出问题

6. 类似问题：
   - 不同路径II（有障碍物）
   - 最小路径和
   - 其他网格路径问题

7. 关键洞察：
   - 每个位置的路径数只依赖于上方和左方的路径数
   - 可以使用滚动数组优化空间复杂度
   - 问题可以转化为组合数学问题

8. 示例分析：
   m=3, n=2的网格：
   [1][1][1]
   [1][2][3]
   - 第一行和第一列都是1
   - dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2
   - dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3

9. 数学解法：
   - 从起点到终点需要向右移动n-1步，向下移动m-1步
   - 总步数为m+n-2步，其中选择m-1步向下
   - 路径数 = C(m+n-2, m-1) = (m+n-2)! / ((m-1)! * (n-1)!)
*/
