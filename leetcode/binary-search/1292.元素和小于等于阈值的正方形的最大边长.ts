/*
 * @lc app=leetcode.cn id=1292 lang=typescript
 *
 * [1292] 元素和小于等于阈值的正方形的最大边长
 *
 * https://leetcode.cn/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/description/
 *
 * algorithms
 * Medium (53.82%)
 * Likes:    1362
 * Dislikes: 113
 * Total Accepted:    76.9K
 * Total Submissions: 126.3K
 * Testcase Example:  '[[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]]\n4'
 *
 * 给你一个 m x n 的矩阵 mat 和一个整数 threshold，返回元素和小于等于
 * threshold 的正方形子矩阵的最大边长；若不存在则返回 0。
 *
 *
 * 示例 1：
 *
 *
 * 输入：mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]],
 * threshold = 4
 * 输出：2
 * 解释：满足条件的最大边长为 2。
 *
 *
 * 示例 2：
 *
 *
 * 输入：mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]],
 * threshold = 1
 * 输出：0
 *
 *
 *
 * 提示：
 *
 *
 * m == mat.length
 * n == mat[i].length
 * 1 <= m, n <= 300
 * 0 <= mat[i][j] <= 10^4
 * 0 <= threshold <= 10^5
 *
 *
 */

// @lc code=start
/**
 * 求元素和不超过阈值的最大正方形边长。
 *
 * @param mat - m x n 的非负整数矩阵
 * @param threshold - 子矩阵元素和上限
 * @returns 最大满足条件的正方形边长
 */
function maxSideLength(mat: number[][], threshold: number): number {
  const m = mat.length;
  const n = mat[0].length;
  const prefixSum: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  // 预处理二维前缀和，便于 O(1) 计算任意子矩阵和
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      prefixSum[i][j] =
        mat[i - 1][j - 1] +
        prefixSum[i - 1][j] +
        prefixSum[i][j - 1] -
        prefixSum[i - 1][j - 1];
    }
  }

  let left = 0;
  let right = Math.min(m, n);
  let result = 0;

  // 二分边长，判断是否存在满足条件的正方形
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let found = false;
    for (let i = mid; i <= m; i++) {
      for (let j = mid; j <= n; j++) {
        // 计算右下角为 (i, j) 的 mid x mid 正方形元素和
        const total =
          prefixSum[i][j] -
          prefixSum[i - mid][j] -
          prefixSum[i][j - mid] +
          prefixSum[i - mid][j - mid];
        if (total <= threshold) {
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (found) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：找到元素和不超过阈值的最大正方形子矩阵边长。
   - 关键特点：矩阵元素非负，边长越大，和越大。
   - 目标：返回最大边长，若不存在返回 0。

2. 解题思路
   核心思想
   - 使用二维前缀和快速求任意子矩阵的和。
   - 对边长进行二分搜索，判断是否存在满足条件的正方形。

   算法步骤
   1) 预处理二维前缀和 prefixSum。
   2) 在 [0, min(m, n)] 之间二分边长 mid。
   3) 枚举所有 mid x mid 正方形，利用前缀和 O(1) 求和。
   4) 若存在和 <= threshold，则尝试更大边长；否则缩小边长。
   5) 返回最终最大可行边长。

3. 代码实现
   实现步骤
   - prefixSum[i][j] 表示 (0,0) 到 (i-1,j-1) 的元素和。
   - 子矩阵和可用四个前缀和做加减得到。
   - 二分循环内只要找到一个可行正方形即可提前结束扫描。

   关键函数说明
   - maxSideLength：主函数，构建前缀和并进行二分验证。

4. 复杂度分析
   - 时间复杂度：O(m*n*log(min(m,n)))。
   - 空间复杂度：O(m*n)。
   - 关键观察：前缀和使子矩阵求和从 O(k^2) 降至 O(1)。

5. 示例分析
   示例一：mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]],
   threshold = 4
   - 边长 2 的正方形可满足条件，边长 3 不满足，答案为 2。

   示例二：mat 全为 2，threshold = 1
   - 任意 1x1 都超过阈值，答案为 0。

   边界情况
   - threshold 为 0 且元素非负，除非存在 0 否则结果为 0。
   - 单行/单列矩阵，最大边长不超过 1。

6. 算法要点总结
   核心技巧
   - 二维前缀和实现快速区间求和。
   - 二分搜索减少边长枚举次数。

   优化要点
   - 二分时一旦发现可行即可移动左边界，避免重复扫描。
   - 可用滚动数组降低前缀和空间，但当前范围内二维表更直观。

   类似问题
   - 最大边长/面积子矩阵满足条件的题目。
   - 使用前缀和 + 二分的组合优化。

7. 常见错误
   - 前缀和索引偏移写错导致子矩阵和计算错误。
   - 忽略二分的可行性单调性，导致错误判断。
   - 直接暴力枚举边长与位置，时间超限。
*/
