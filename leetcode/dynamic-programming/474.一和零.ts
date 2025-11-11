/*
 * @lc app=leetcode.cn id=474 lang=typescript
 *
 * [474] 一和零
 *
 * https://leetcode-cn.com/problems/ones-and-zeroes/description/
 *
 * algorithms
 * Medium (56.89%)
 * Likes:    411
 * Dislikes: 0
 * Total Accepted:    43.7K
 * Total Submissions: 76.4K
 * Testcase Example:  '["10","0001","111001","1","0"]\n5\n3'
 *
 * 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
 *
 *
 * 请你找出并返回 strs 的最大子集的大小，该子集中 最多 有 m 个 0 和 n 个 1 。
 *
 * 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
 * 输出：4
 * 解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
 * 其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1
 * ，大于 n 的值 3 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["10", "0", "1"], m = 1, n = 1
 * 输出：2
 * 解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * strs[i] 仅由 '0' 和 '1' 组成
 * 1
 *
 *
 */

// @lc code=start
/**
 * 解法一：三维动态规划
 *
 * 这是标准的 0-1 背包问题的变种，不同的是有两个容量限制（m 个 0 和 n 个 1）
 */
var findMaxForm = function (strs: string[], m: number, n: number): number {
  const length = strs.length;

  // dp[i][j][k] 表示：
  // 在前 i 个字符串中，使用 j 个 0 和 k 个 1 的情况下，最多可以得到的字符串数量
  // i 的范围是 [0, length]，j 的范围是 [0, m]，k 的范围是 [0, n]
  const dp: number[][][] = Array.from(new Array(length + 1), () =>
    Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
  );

  // 遍历每个字符串
  for (let i = 1; i <= length; i++) {
    // 统计当前字符串中 0 和 1 的数量
    const zonesOnes = getZonesOnes(strs[i - 1]);
    const [zones, ones] = zonesOnes;

    // 遍历所有可能的 0 的数量
    for (let j = 0; j <= m; j++) {
      // 遍历所有可能的 1 的数量
      for (let k = 0; k <= n; k++) {
        // 情况1：不选择当前字符串，继承前 i-1 个字符串的结果
        dp[i][j][k] = dp[i - 1][j][k];

        // 情况2：选择当前字符串（前提是有足够的 0 和 1）
        if (j >= zones && k >= ones) {
          // 在两种情况中选择最大值：
          // - 不选当前字符串：dp[i-1][j][k]
          // - 选当前字符串：dp[i-1][j-zones][k-ones] + 1
          dp[i][j][k] = Math.max(
            dp[i][j][k],
            dp[i - 1][j - zones][k - ones] + 1
          );
        }
      }
    }
  }

  // 返回使用所有字符串、m 个 0 和 n 个 1 的最大子集大小
  return dp[length][m][n];

  /**
   * 统计字符串中 0 和 1 的数量
   * @param str - 二进制字符串
   * @returns [0的数量, 1的数量]
   */
  function getZonesOnes(str: string): number[] {
    const zonesOnes: [number, number] = [0, 0];
    const length = str.length;
    for (let i = 0; i < length; i++) {
      // 通过字符编码差值来判断是 0 还是 1
      zonesOnes[getCharCode(str[i])]++;
    }
    return zonesOnes;
  }

  /**
   * 将字符 '0' 或 '1' 转换为数字 0 或 1
   * @param char - 字符 '0' 或 '1'
   * @returns 数字 0 或 1
   */
  function getCharCode(char: string): number {
    return char.charCodeAt(0) - "0".charCodeAt(0);
  }
};
// @lc code=end

/**
 * 解法二：二维动态规划（空间优化版本）
 *
 * 利用滚动数组优化空间复杂度，将三维 DP 降为二维
 */
var findMaxForm = function (strs: string[], m: number, n: number): number {
  const length = strs.length;

  // dp[j][k] 表示：使用 j 个 0 和 k 个 1 的情况下，最多可以得到的字符串数量
  // 通过倒序遍历来实现状态转移，避免覆盖还未使用的状态
  const dp: number[][] = Array.from(new Array(m + 1), () =>
    new Array(n + 1).fill(0)
  );

  // 遍历每个字符串
  for (let i = 0; i < length; i++) {
    // 统计当前字符串中 0 和 1 的数量
    const zonesOnes = getZonesOnes(strs[i]);
    const [zones, ones] = zonesOnes;

    // 【重要】倒序遍历，避免状态被覆盖
    // 从 m 到 zones，从 n 到 ones
    // 这样可以保证在计算 dp[j][k] 时，dp[j-zones][k-ones] 还是上一轮的值
    for (let j = m; j >= zones; j--) {
      for (let k = n; k >= ones; k--) {
        // 状态转移方程：
        // dp[j][k] = max(不选当前字符串, 选当前字符串)
        // 不选：dp[j][k]（保持原值）
        // 选：dp[j-zones][k-ones] + 1
        dp[j][k] = Math.max(dp[j][k], dp[j - zones][k - ones] + 1);
      }
    }
  }

  // 返回使用 m 个 0 和 n 个 1 的最大子集大小
  return dp[m][n];

  /**
   * 统计字符串中 0 和 1 的数量
   * @param str - 二进制字符串
   * @returns [0的数量, 1的数量]
   */
  function getZonesOnes(str: string): number[] {
    const zonesOnes: [number, number] = [0, 0];
    const length = str.length;
    for (let i = 0; i < length; i++) {
      // 通过字符编码差值来判断是 0 还是 1
      zonesOnes[getCharCode(str[i])]++;
    }
    return zonesOnes;
  }

  /**
   * 将字符 '0' 或 '1' 转换为数字 0 或 1
   * @param char - 字符 '0' 或 '1'
   * @returns 数字 0 或 1
   */
  function getCharCode(char: string): number {
    return char.charCodeAt(0) - "0".charCodeAt(0);
  }
};

/*
解题思路详解：

1. 问题本质：
   - 这是一个双维度约束的 0-1 背包问题
   - 每个字符串只能选或不选（0-1 背包）
   - 有两个容量限制：最多 m 个 0 和最多 n 个 1
   - 目标是在满足约束条件下，选择尽可能多的字符串

2. 算法分析：
   - 时间复杂度：
     * 解法一：O(l × m × n)，其中 l 是字符串数组的长度
     * 解法二：O(l × m × n)，时间复杂度相同，但空间复杂度更优
   - 空间复杂度：
     * 解法一：O(l × m × n) - 使用三维 DP 数组
     * 解法二：O(m × n) - 使用二维 DP 数组（推荐）
   - 算法类型：动态规划（0-1 背包变种）

3. 解题思路：

   【核心思想】
   - 将问题转化为 0-1 背包问题：
     * 每个字符串是一个"物品"
     * 字符串中的 0 和 1 的数量是"重量"（有两个维度）
     * 每选择一个字符串，"价值"增加 1
     * 背包有两个容量限制：m 个 0 和 n 个 1
   
   【状态定义】
   - 解法一（三维 DP）：
     * dp[i][j][k] = 在前 i 个字符串中，使用 j 个 0 和 k 个 1，能选择的最大字符串数量
   
   - 解法二（二维 DP）：
     * dp[j][k] = 使用 j 个 0 和 k 个 1，能选择的最大字符串数量
     * 通过倒序遍历实现滚动数组优化
   
   【状态转移方程】
   对于第 i 个字符串（包含 zeros 个 0 和 ones 个 1）：
   - 不选择第 i 个字符串：dp[i][j][k] = dp[i-1][j][k]
   - 选择第 i 个字符串（需要 j >= zeros 且 k >= ones）：
     dp[i][j][k] = dp[i-1][j-zeros][k-ones] + 1
   - 取两者的最大值：
     dp[i][j][k] = max(dp[i-1][j][k], dp[i-1][j-zeros][k-ones] + 1)

4. 实现要点：

   【数据结构选择】
   - 解法一：三维数组 dp[length+1][m+1][n+1]
   - 解法二：二维数组 dp[m+1][n+1]，通过倒序遍历避免状态覆盖

   【边界条件处理】
   - 初始状态：dp 数组全部初始化为 0
   - 当 j < zeros 或 k < ones 时，无法选择当前字符串

   【优化技巧】
   - 空间优化：解法二通过倒序遍历，将三维 DP 优化为二维
   - 倒序遍历的原因：保证在计算 dp[j][k] 时，dp[j-zeros][k-ones] 
     还是上一轮迭代的值，没有被本轮更新覆盖

5. 示例分析：

   【示例 1】strs = ["10","0001","111001","1","0"], m = 5, n = 3
   
   各字符串的 0 和 1 数量：
   - "10": 1 个 0, 1 个 1
   - "0001": 3 个 0, 1 个 1
   - "111001": 2 个 0, 4 个 1（超过 n=3，不能和其他字符串一起选）
   - "1": 0 个 0, 1 个 1
   - "0": 1 个 0, 0 个 1
   
   最优解：选择 {"10", "0001", "1", "0"}
   - 总共使用：(1+3+0+1) = 5 个 0，(1+1+1+0) = 3 个 1
   - 满足 m=5, n=3 的约束
   - 选择了 4 个字符串
   
   【执行过程】（以解法二为例）
   
   初始：dp 全为 0
   
   处理 "10" (1个0, 1个1)：
   - dp[5][3] = max(0, dp[4][2] + 1) = 1
   - dp[4][3] = max(0, dp[3][2] + 1) = 1
   - ...更新所有 j>=1, k>=1 的状态
   
   处理 "0001" (3个0, 1个1)：
   - dp[5][3] = max(1, dp[2][2] + 1) = 2
   - ...继续更新
   
   处理 "111001" (2个0, 4个1)：
   - 因为 4 > n=3，大部分状态无法更新
   
   处理 "1" (0个0, 1个1)：
   - dp[5][3] = max(2, dp[5][2] + 1) = 3
   
   处理 "0" (1个0, 0个1)：
   - dp[5][3] = max(3, dp[4][3] + 1) = 4
   
   最终 dp[5][3] = 4

6. 算法优势：
   - 解法二的空间优化非常实用，在大数据量时优势明显
   - 状态转移清晰，容易理解和实现
   - 可以扩展到更多维度的约束条件

7. 核心算法步骤：
   1. 初始化 DP 数组
   2. 遍历每个字符串，统计其中 0 和 1 的数量
   3. 倒序遍历所有可能的 0 和 1 的数量组合
   4. 应用状态转移方程，更新 DP 数组
   5. 返回 dp[m][n] 作为最终答案

8. 常见错误：
   - ❌ 正序遍历导致状态被覆盖：
     * 在解法二中，如果正序遍历 j 和 k，会导致 dp[j-zeros][k-ones] 
       已经被本轮更新，无法正确实现 0-1 背包
   
   - ❌ 边界条件判断遗漏：
     * 必须检查 j >= zeros && k >= ones，否则数组越界
   
   - ❌ 初始化错误：
     * DP 数组应该初始化为 0，表示不选任何字符串时的数量为 0

9. 扩展思考：
   
   【类似问题】
   - LeetCode 416. 分割等和子集（单维度 0-1 背包）
   - LeetCode 494. 目标和（0-1 背包变种）
   - LeetCode 1049. 最后一块石头的重量 II
   
   【变种问题】
   - 如果要求恰好使用 m 个 0 和 n 个 1，如何修改？
     * 初始化：只有 dp[0][0] = 0，其他位置初始化为 -∞
     * 最后检查 dp[m][n] 是否 >= 0
   
   - 如果每个字符串可以使用多次（完全背包）？
     * 改为正序遍历：for (let j = zeros; j <= m; j++)
   
   【优化方向】
   - 如果 m 和 n 很大，但字符串数量较少，可以考虑使用哈希表
     记录所有可达的 (zeros, ones) 状态，减少不必要的计算
*/
