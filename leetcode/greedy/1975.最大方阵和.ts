/*
 * @lc app=leetcode.cn id=1975 lang=typescript
 *
 * [1975] 最大方阵和
 *
 * https://leetcode.cn/problems/maximum-matrix-sum/description/
 *
 * algorithms
 * Medium (65.84%)
 * Likes:    1186
 * Dislikes: 57
 * Total Accepted:    120.2K
 * Total Submissions: 181.9K
 * Testcase Example:  '[[1,-1],[-1,1]]'
 *
 * 给你一个 n x n 的整数矩阵 matrix。你可以进行以下操作任意次：
 *
 *
 * 选择任意两个相邻元素，并将它们都乘以 -1。
 *
 *
 * 如果两个元素共享一条边，则认为它们相邻。
 *
 * 你的目标是最大化矩阵元素之和，返回可得到的最大和。
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,-1],[-1,1]]
 * 输出：4
 * 解释：
 * - 将第一行的两个元素乘以 -1。
 * - 将第一列的两个元素乘以 -1。
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
 * 输出：16
 * 解释：
 * - 将第二行最后两个元素乘以 -1。
 *
 *
 *
 * 提示：
 *
 *
 * n == matrix.length == matrix[i].length
 * 2 <= n <= 250
 * -10^5 <= matrix[i][j] <= 10^5
 *
 *
 */

// @lc code=start
/**
 * 通过翻转相邻元素符号，获得矩阵元素之和的最大值。
 *
 * @param matrix - n x n 整数矩阵
 * @returns 可获得的最大矩阵元素和
 */
function maxMatrixSum(matrix: number[][]): number {
  const n = matrix.length;
  let totalSum = 0;
  let negativeCount = 0;
  let minAbsValue = Infinity;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const value = matrix[i][j];
      const absValue = Math.abs(value);
      // 先累加绝对值，假设所有数都能变为非负
      totalSum += absValue;
      if (value < 0) {
        // 统计负数个数，用于判断奇偶性
        negativeCount++;
      }
      // 记录最小绝对值，奇数个负数时需要牺牲它的符号
      minAbsValue = Math.min(minAbsValue, absValue);
    }
  }

  if (negativeCount % 2) {
    // 负数个数为奇数时，必须保留一个最小绝对值为负
    return totalSum - 2 * minAbsValue;
  }

  return totalSum;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：通过翻转相邻元素的符号，实现矩阵元素和最大化。
   - 关键特点：一次操作翻转两个相邻元素，符号变化具有“偶数次可抵消”属性。
   - 目标：最大化所有元素之和。

2. 解题思路
   核心思想
   - 任意元素的符号可以通过一系列相邻翻转被改变，只受“负数数量奇偶性”约束。
   - 若负数数量为偶数，可将全部元素变为非负，最大和为绝对值之和。
   - 若为奇数，必须保留一个负数，最优是让绝对值最小的元素为负。

   算法步骤
   1) 遍历矩阵，累计所有元素绝对值 totalSum。
   2) 统计负数数量 negativeCount，并记录最小绝对值 minAbsValue。
   3) 若 negativeCount 为偶数，答案为 totalSum。
   4) 若为奇数，答案为 totalSum - 2 * minAbsValue。

3. 代码实现
   实现步骤
   - 双层循环扫描矩阵。
   - 同时维护总绝对值和、负数计数、最小绝对值。
   - 根据负数个数奇偶性返回答案。

   关键函数说明
   - maxMatrixSum：主函数，线性扫描后按奇偶性计算最大和。

4. 复杂度分析
   - 时间复杂度：O(n^2)，每个元素访问一次。
   - 空间复杂度：O(1)，仅使用常数额外变量。
   - 关键观察：相邻翻转操作只影响符号奇偶性，不影响绝对值集合。

5. 示例分析
   示例一：matrix = [[1,-1],[-1,1]]
   - 负数个数 2，为偶数，答案为 |1|+|1|+|1|+|1|=4。

   示例二：matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
   - 负数个数 3，为奇数。
   - 总绝对值之和为 18，最小绝对值为 1。
   - 答案为 18 - 2*1 = 16。

   边界情况
   - 全部为非负：答案为元素总和。
   - 存在 0：若负数为奇数，可用 0 作为最小绝对值使不损失。

6. 算法要点总结
   核心技巧
   - 绝对值之和是上界，负数奇偶性决定能否达到上界。
   - 奇数负数时保留最小绝对值为负损失最小。

   优化要点
   - 一次扫描同时完成统计。
   - 只需常数额外空间。

   类似问题
   - 翻转符号最大化总和的问题。
   - 通过奇偶性约束决定最优目标值的题目。

7. 常见错误
   - 忽略负数个数奇偶性，直接返回绝对值和。
   - 未记录最小绝对值，导致奇数负数时无法正确减去最小损失。
   - 误以为必须模拟翻转步骤，增加时间复杂度。
*/
