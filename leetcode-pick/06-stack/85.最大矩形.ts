/*
 * @lc app=leetcode.cn id=85 lang=typescript
 *
 * [85] 最大矩形
 *
 * https://leetcode-cn.com/problems/maximal-rectangle/description/
 *
 * algorithms
 * Hard (40.56%)
 * Likes:    480
 * Dislikes: 0
 * Total Accepted:    32.5K
 * Total Submissions: 69.6K
 * Testcase Example:  '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]'
 *
 * 给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 *
 * 示例:
 *
 * 输入:
 * [
 * ⁠ ["1","0","1","0","0"],
 * ⁠ ["1","0","1","1","1"],
 * ⁠ ["1","1","1","1","1"],
 * ⁠ ["1","0","0","1","0"]
 * ]
 * 输出: 6
 *
 */

// @lc code=start

/**
 * 动态规划解法：逐行计算每个位置的连续1的长度，然后向上扩展计算矩形面积
 * 时间复杂度：O(n²m)，空间复杂度：O(nm)
 */
var maximalRectangle = function (matrix: string[][]): number {
  const n = matrix.length;
  if (n === 0) return 0;
  const m = matrix[0].length;
  let ret = 0;

  // dp[i][j] 表示第i行第j列位置向左连续1的个数（包括自己）
  const dp: number[][] = Array.from(new Array(n), () => new Array(m).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === "1") {
        // 计算当前位置向左连续1的个数
        dp[i][j] = j === 0 ? 1 : dp[i][j - 1] + 1;

        // 以当前位置为矩形右下角，向上扩展计算所有可能的矩形
        let width = dp[i][j]; // 初始宽度为当前行的连续1个数
        for (let k = i; k >= 0; k--) {
          // 矩形的宽度由最短的那一行决定
          width = Math.min(width, dp[k][j]);
          // 如果当前行没有1，则无法继续向上扩展
          if (width === 0) break;
          // 计算矩形面积：宽度 × 高度
          ret = Math.max(ret, width * (i - k + 1));
        }
      }
    }
  }

  return ret;
};

/**
 * 基于84题柱状图最大矩形的解法：将每一行看作柱状图的底部
 * 时间复杂度：O(nm)，空间复杂度：O(m)
 */
var maximalRectangle = function (matrix: string[][]): number {
  const n = matrix.length;
  if (n === 0) return 0;
  const m = matrix[0].length;

  // heights[j] 表示以当前行为底，第j列的柱子高度
  const heights: number[] = new Array(m).fill(0);
  let maxArea = 0;

  for (let i = 0; i < n; i++) {
    // 更新每一列的柱子高度
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === "1") {
        heights[j] += 1; // 如果是1，高度+1
      } else {
        heights[j] = 0; // 如果是0，高度重置为0
      }
    }

    // 对当前的柱状图计算最大矩形面积（使用84题的算法）
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;

  // 84题：柱状图中最大的矩形（单调栈解法）
  function largestRectangleArea(heights: number[]): number {
    const len = heights.length;
    const left: number[] = new Array(len);
    const right: number[] = new Array(len).fill(len);
    const stack: number[] = [];

    for (let i = 0; i < len; i++) {
      while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
        right[stack[stack.length - 1]] = i;
        stack.pop();
      }
      left[i] = stack.length ? stack[stack.length - 1] : -1;
      stack.push(i);
    }

    let ret = 0;
    for (let i = 0; i < len; i++) {
      ret = Math.max(ret, (right[i] - left[i] - 1) * heights[i]);
    }
    return ret;
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在二维01矩阵中找到只包含1的最大矩形面积
   - 可以转化为多个"柱状图中最大矩形"的问题
   - 关键是如何将二维问题降维到一维问题

2. 算法分析：
   动态规划解法：
   - 时间复杂度：O(n²m) - 对每个位置都要向上扩展
   - 空间复杂度：O(nm) - 二维DP数组
   
   柱状图解法：
   - 时间复杂度：O(nm) - 每行计算一次柱状图最大矩形
   - 空间复杂度：O(m) - 一维heights数组和栈空间
   - 算法类型：单调栈 + 问题转化

3. 实现要点：
   动态规划方法：
   - dp[i][j]记录第i行第j列向左连续1的个数
   - 对每个位置，向上扩展计算以该位置为右下角的所有矩形
   - 矩形宽度由向上路径中最短的连续1长度决定
   
   柱状图方法：
   - 将每一行作为柱状图的底部
   - heights[j]表示第j列从当前行向上连续1的个数
   - 遇到0时柱子高度重置，遇到1时柱子高度递增
   - 对每行的柱状图调用84题的算法

4. 优化思路：
   - 柱状图方法时间复杂度更优，空间复杂度也更好
   - 核心思想：降维 - 将二维问题转化为多个一维问题
   - 复用84题的高效单调栈算法

5. 类似问题：
   - 84. 柱状图中最大的矩形（本题的基础）
   - 221. 最大正方形（类似的二维DP问题）
   - 1277. 统计全为1的正方形子矩阵（二维DP变种）
*/
