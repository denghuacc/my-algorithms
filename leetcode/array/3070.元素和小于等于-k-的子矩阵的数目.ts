/*
 * @lc app=leetcode.cn id=3070 lang=typescript
 *
 * [3070] 元素和小于等于 k 的子矩阵的数目
 *
 * https://leetcode.cn/problems/count-submatrices-with-top-left-element-and-sum-less-than-k/description/
 *
 * algorithms
 * Medium (65.78%)
 * Likes:    24
 * Dislikes: 0
 * Total Accepted:    18.1K
 * Total Submissions: 25.5K
 * Testcase Example:  '[[7,6,3],[6,6,1]]\n18'
 *
 * 给你一个下标从 0 开始的整数矩阵 grid 和一个整数 k。
 *
 * 返回包含 grid 左上角元素、元素和小于或等于 k 的 子矩阵的数目。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[7,6,3],[6,6,1]], k = 18
 * 输出：4
 * 解释：如上图所示，只有 4 个子矩阵满足：包含 grid 的左上角元素，并且元素和小于或等于 18 。
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[7,2,9],[1,5,0],[2,6,6]], k = 20
 * 输出：6
 * 解释：如上图所示，只有 6 个子矩阵满足：包含 grid 的左上角元素，并且元素和小于或等于 20 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= n, m <= 1000
 * 0 <= grid[i][j] <= 1000
 * 1 <= k <= 10^9
 *
 *
 */

// @lc code=start
/**
 * 统计包含左上角元素、且元素和不超过 k 的子矩阵数量。
 *
 * 关键观察：
 * - 题目要求子矩阵必须包含左上角元素 `grid[0][0]`，
 *   因此任意合法子矩阵都唯一对应一个右下角 `(i, j)`。
 * - 也就是说，我们只需要统计所有前缀子矩阵
 *   `grid[0..i][0..j]` 中有多少个和 <= k。
 *
 * 实现方式：
 * - `colPrefix[j]` 表示当前扫描到第 i 行时，
 *   第 j 列从第 0 行到第 i 行的列和。
 * - `prefixSum` 表示当前右下角为 `(i, j)` 的前缀子矩阵总和。
 *
 * @param grid - 非负整数矩阵
 * @param k - 子矩阵元素和上限
 * @returns 满足条件的子矩阵数量
 *
 * 时间复杂度：O(m * n)
 * 空间复杂度：O(n)
 */
function countSubmatrices(grid: number[][], k: number): number {
  const m = grid.length;
  const n = grid[0].length;
  const colPrefix = new Array(n).fill(0);
  let count = 0;

  for (let i = 0; i < m; i++) {
    // prefixSum 表示子矩阵 grid[0..i][0..j] 的元素和。
    let prefixSum = 0;

    for (let j = 0; j < n; j++) {
      // 先把第 j 列到当前行为止的列和维护出来。
      colPrefix[j] += grid[i][j];

      // 再把这一列的贡献加到当前前缀子矩阵和中。
      prefixSum += colPrefix[j];

      if (prefixSum <= k) {
        count++;
      }
    }
  }

  return count;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 子矩阵必须包含左上角元素 `grid[0][0]`。
   - 这意味着子矩阵左上角固定为 `(0, 0)`，
     只需要选择右下角 `(i, j)`。
   - 所以题目本质上是在问：
     有多少个前缀子矩阵 `grid[0..i][0..j]` 的元素和 <= k。

2. 直接做法为什么不够好
   - 如果对每个 `(i, j)` 都重新计算一次矩阵和，
     单次可能需要 O(m * n)，总复杂度会非常高。
   - 题目 `m, n` 最多可到 1000，
     需要一个 O(m * n) 级别的算法。

3. 核心思路：逐行扫描 + 列前缀和
   - 我们按行从上到下扫描矩阵。
   - 定义 `colPrefix[j]`：
     表示当前处理到第 i 行时，第 j 列从第 0 行到第 i 行的元素和。
   - 当固定第 i 行后，若我们从左到右扫第 j 列：
     - `colPrefix[j]` 就是当前前缀子矩阵新增的一整列贡献；
     - 把这些列贡献累加起来，就得到 `grid[0..i][0..j]` 的总和。

4. 为什么这样算是正确的
   - 对固定的右下角 `(i, j)`，
     前缀子矩阵 `grid[0..i][0..j]` 的和，
     等于前 j+1 列在 0..i 行上的列和之和。
   - 而 `colPrefix[j]` 恰好记录了“第 j 列在 0..i 行上的列和”。
   - 因此从左到右累加 `colPrefix[0] + colPrefix[1] + ... + colPrefix[j]`，
     就正好得到目标子矩阵和。

5. 算法步骤
   1. 初始化长度为 n 的数组 `colPrefix`，初值全为 0。
   2. 枚举行 i：
      - 初始化 `prefixSum = 0`。
      - 枚举列 j：
        1) 更新 `colPrefix[j] += grid[i][j]`
        2) 更新 `prefixSum += colPrefix[j]`
        3) 若 `prefixSum <= k`，答案加 1
   3. 返回统计结果。

6. 示例分析
   - 输入：
     `grid = [[7,6,3],[6,6,1]], k = 18`

   第 0 行：
   - j=0：colPrefix=[7,0,0]，prefixSum=7，满足
   - j=1：colPrefix=[7,6,0]，prefixSum=13，满足
   - j=2：colPrefix=[7,6,3]，prefixSum=16，满足

   第 1 行：
   - j=0：colPrefix=[13,6,3]，prefixSum=13，满足
   - j=1：prefixSum=19，不满足
   - j=2：prefixSum=23，不满足

   所以答案为 4。

7. 复杂度分析
   - 时间复杂度：O(m * n)
     每个元素只被访问和处理一次。
   - 空间复杂度：O(n)
     只额外维护一维列前缀和数组。

8. 常见错误
   - 误以为要统计任意位置的子矩阵。
     实际上左上角固定，所以问题简单很多。
   - 把 `prefixSum` 写成只累加当前行，
     忽略了前面行对同一列的贡献。
   - 使用二维前缀和也能做，但会引入不必要的额外空间和实现复杂度。

9. 总结
   - 这题的关键是识别“左上角固定”的特殊条件。
   - 一旦看出每个合法子矩阵都只由右下角决定，
     就可以把问题转成前缀子矩阵求和问题。
   - 再配合一维列累计和，就能在线性扫描中完成统计。
*/
