/*
 * @lc app=leetcode.cn id=799 lang=typescript
 *
 * [799] 香槟塔
 *
 * https://leetcode.cn/problems/champagne-tower/description/
 *
 * algorithms
 * Medium (43.30%)
 * Likes:    157
 * Dislikes: 0
 * Total Accepted:    11.6K
 * Total Submissions: 25.1K
 * Testcase Example:  '1\n1\n1'
 *
 * 我们把玻璃杯摆成金字塔的形状，其中 第一层 有 1 个玻璃杯， 第二层 有 2 个，依次类推到第 100 层，每个玻璃杯 (250ml) 将盛有香槟。
 *
 *
 * 从顶层的第一个玻璃杯开始倾倒一些香槟，当顶层的杯子满了，任何溢出的香槟都会立刻等流量的流向左右两侧的玻璃杯。当左右两边的杯子也满了，就会等流量的流向它们左右两边的杯子，依次类推。（当最底层的玻璃杯满了，香槟会流到地板上）
 *
 * 例如，在倾倒一杯香槟后，最顶层的玻璃杯满了。倾倒了两杯香槟后，第二层的两个玻璃杯各自盛放一半的香槟。在倒三杯香槟后，第二层的香槟满了 -
 * 此时总共有三个满的玻璃杯。在倒第四杯后，第三层中间的玻璃杯盛放了一半的香槟，他两边的玻璃杯各自盛放了四分之一的香槟，如下图所示。
 *
 *
 *
 * 现在当倾倒了非负整数杯香槟后，返回第 i 行 j 个玻璃杯所盛放的香槟占玻璃杯容积的比例（ i 和 j 都从0开始）。
 *
 *
 *
 *
 * 示例 1:
 * 输入: poured(倾倒香槟总杯数) = 1, queryGlass(杯子的位置数) = 1, queryRow(行数) = 1
 * 输出: 0.00000
 * 解释: 我们在顶层（下标是（0，0））倒了一杯香槟后，没有溢出，因此所有在顶层以下的玻璃杯都是空的。
 *
 * 示例 2:
 * 输入: poured(倾倒香槟总杯数) = 2, queryGlass(杯子的位置数) = 1, queryRow(行数) = 1
 * 输出: 0.50000
 * 解释:
 * 我们在顶层（下标是（0，0）倒了两杯香槟后，有一杯量的香槟将从顶层溢出，位于（1，0）的玻璃杯和（1，1）的玻璃杯平分了这一杯香槟，所以每个玻璃杯有一半的香槟。
 *
 *
 *
 *
 * 示例 3:
 *
 *
 * 输入: poured = 100000009, queryRow = 33, queryGlass = 17
 * 输出: 1.00000
 *
 *
 *
 *
 * 提示:
 *
 *
 * 0 <= poured <= 10^9
 * 0 <= queryGlass <= query_row < 100
 *
 *
 */

// @lc code=start
/**
 * 计算香槟塔中指定杯子的装满比例。
 *
 * @param poured - 倾倒的香槟总杯数
 * @param queryRow - 目标杯子所在行（从 0 开始）
 * @param queryGlass - 目标杯子所在列（从 0 开始）
 * @returns 目标杯子的装满比例，范围 [0, 1]
 */
function champagneTower(
  poured: number,
  queryRow: number,
  queryGlass: number
): number {
  // dp[i][j]：第 i 行第 j 列杯子“接收到”的香槟总量（可大于 1）
  // 只需模拟到 queryRow + 1 行，故开到 queryRow + 2 足够安全
  const dp = Array.from(new Array(queryRow + 2), () =>
    new Array(queryRow + 2).fill(0)
  );
  dp[0][0] = poured;

  // 逐层向下分流：每个杯子超过 1 的部分平均流向下一层左右两杯
  for (let i = 0; i <= queryRow; i++) {
    for (let j = 0; j <= i; j++) {
      if (dp[i][j] <= 1) {
        // 没有溢出，不会继续向下层贡献
        continue;
      }
      const overflow = (dp[i][j] - 1) / 2;
      dp[i + 1][j] += overflow;
      dp[i + 1][j + 1] += overflow;
    }
  }
  // 杯子最多装满 1 杯
  return Math.min(1, dp[queryRow][queryGlass]);
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：模拟香槟在三角形杯塔中的逐层溢出与分流。
   - 关键特点：每个杯子容量为 1，超过部分按 1:1 分给下一层左右杯子。
   - 目标：求指定位置杯子的最终装满比例（最大为 1）。

2. 解题思路
   核心思想
   - 使用动态规划按层模拟：
     dp[i][j] 表示第 i 行第 j 个杯子接收到的总香槟量。
   - 若 dp[i][j] > 1，溢出量为 dp[i][j] - 1，下一层左右各得到一半。

   算法步骤
   1) 初始化 dp[0][0] = poured。
   2) 从第 0 行遍历到 queryRow：
      - 若当前杯子不满（<=1），跳过。
      - 否则计算溢出量 overflow = (dp[i][j] - 1) / 2。
      - 累加到 dp[i+1][j] 和 dp[i+1][j+1]。
   3) 返回 min(1, dp[queryRow][queryGlass])。

3. 代码实现
   实现步骤
   - 二维数组记录“流经量”，而非最终容量，便于继续分流。
   - 只开到 queryRow + 2 行列，避免无意义的额外空间。
   - 对不溢出的杯子直接剪枝。

   关键函数说明
   - champagneTower：主函数，完成动态规划模拟并输出结果。

4. 复杂度分析
   - 时间复杂度：O(queryRow^2)，最多遍历前 queryRow 层三角区域。
   - 空间复杂度：O(queryRow^2)，使用二维 DP 表。
   - 关键观察：只需模拟到目标行，不必计算第 100 层全量状态。

5. 示例分析
   示例一：poured=1, queryRow=1, queryGlass=1
   - 顶层刚好装满，无溢出，下一层都为 0，答案 0。

   示例二：poured=2, queryRow=1, queryGlass=1
   - 顶层溢出 1 杯，下一层两侧各得 0.5，答案 0.5。

   示例三：poured=4（直观）
   - 顶层溢出 3 杯，第二层各 1.5，再继续向第三层分流。
   - 最终每个杯子最多记为 1（装满）。

   边界情况
   - poured=0：所有杯子均为 0。
   - queryRow=0 且 queryGlass=0：答案为 min(1, poured)。

6. 算法要点总结
   核心技巧
   - 溢出才传播，且传播是线性的、局部的。
   - DP 状态定义为“接收总量”比“当前容量”更易推导。

   优化要点
   - 空间可进一步压缩为一维滚动数组（从右往左更新）。
   - 当前实现保留二维，教学性与可读性更强。

   类似问题
   - 三角结构上的逐层转移 DP。
   - 带容量上限与溢出传播的模拟题。

7. 常见错误
   - 把当前杯子的“容量 1”继续向下传，导致多流。
   - 未对结果取 min(1, x)，返回超过 1 的值。
   - DP 数组开得过小，访问 i+1 越界。
*/
