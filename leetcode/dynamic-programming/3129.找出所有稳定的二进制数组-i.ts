/*
 * @lc app=leetcode.cn id=3129 lang=typescript
 *
 * [3129] 找出所有稳定的二进制数组 I
 *
 * https://leetcode.cn/problems/find-all-possible-stable-binary-arrays-i/description/
 *
 * algorithms
 * Medium (27.41%)
 * Likes:    19
 * Dislikes: 0
 * Total Accepted:    3.2K
 * Total Submissions: 8.2K
 * Testcase Example:  '1\n1\n2'
 *
 * 给你 3 个正整数 zero ，one 和 limit 。
 *
 * 一个 二进制数组 arr 如果满足以下条件，那么我们称它是 稳定的 ：
 *
 *
 * 0 在 arr 中出现次数 恰好 为 zero 。
 * 1 在 arr 中出现次数 恰好 为 one 。
 * arr 中每个长度超过 limit 的 子数组 都 同时 包含 0 和 1 。
 *
 *
 * 请你返回 稳定 二进制数组的 总 数目。
 *
 * 由于答案可能很大，将它对 10^9 + 7 取余 后返回。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：zero = 1, one = 1, limit = 2
 *
 * 输出：2
 *
 * 解释：
 *
 * 两个稳定的二进制数组为 [1,0] 和 [0,1] ，两个数组都有一个 0 和一个 1 ，且没有子数组长度大于 2 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：zero = 1, one = 2, limit = 1
 *
 * 输出：1
 *
 * 解释：
 *
 * 唯一稳定的二进制数组是 [1,0,1] 。
 *
 * 二进制数组 [1,1,0] 和 [0,1,1] 都有长度为 2 且元素全都相同的子数组，所以它们不稳定。
 *
 *
 * 示例 3：
 *
 *
 * 输入：zero = 3, one = 3, limit = 2
 *
 * 输出：14
 *
 * 解释：
 *
 * 所有稳定的二进制数组包括 [0,0,1,0,1,1] ，[0,0,1,1,0,1] ，[0,1,0,0,1,1] ，[0,1,0,1,0,1]
 * ，[0,1,0,1,1,0] ，[0,1,1,0,0,1] ，[0,1,1,0,1,0] ，[1,0,0,1,0,1] ，[1,0,0,1,1,0]
 * ，[1,0,1,0,0,1] ，[1,0,1,0,1,0] ，[1,0,1,1,0,0] ，[1,1,0,0,1,0] 和 [1,1,0,1,0,0]
 * 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= zero, one, limit <= 200
 *
 *
 */

// @lc code=start
/**
 * 找出所有稳定的二进制数组 I
 *
 * 状态定义：
 * - dp[i][j][0]：使用 i 个 0、j 个 1，且最后一位是 0 的稳定数组数量
 * - dp[i][j][1]：使用 i 个 0、j 个 1，且最后一位是 1 的稳定数组数量
 *
 * 递推（前缀和优化后的等价写法）：
 * 1) 末尾为 0：
 *    dp[i][j][0] = dp[i-1][j][0] + dp[i-1][j][1]
 *                  - dp[i-limit-1][j][1]   (当 i > limit 时)
 * 2) 末尾为 1：
 *    dp[i][j][1] = dp[i][j-1][1] + dp[i][j-1][0]
 *                  - dp[i][j-limit-1][0]   (当 j > limit 时)
 *
 * @param zero - 需要放置的 0 的数量
 * @param one - 需要放置的 1 的数量
 * @param limit - 连续相同数字的最大允许长度
 * @returns 稳定二进制数组数量（对 1e9+7 取模）
 *
 * 时间复杂度：O(zero * one)
 * 空间复杂度：O(zero * one)
 */
function numberOfStableArrays(
  zero: number,
  one: number,
  limit: number
): number {
  const MOD = 1_000_000_007;

  // 统一做取模归一化，避免出现负数。
  const norm = (value: number): number => ((value % MOD) + MOD) % MOD;

  // dp[i][j][0/1]：使用 i 个 0、j 个 1，且最后一位是 0/1 的方案数。
  const dp = Array.from(new Array(zero + 1), () =>
    Array.from(new Array(one + 1), () => [0, 0])
  );

  // 边界：只放 0（且连续 0 长度不能超过 limit）
  for (let i = 0; i <= Math.min(zero, limit); i++) {
    dp[i][0][0] = 1;
  }

  // 边界：只放 1（且连续 1 长度不能超过 limit）
  for (let j = 0; j <= Math.min(one, limit); j++) {
    dp[0][j][1] = 1;
  }

  for (let i = 1; i <= zero; i++) {
    for (let j = 1; j <= one; j++) {
      // 计算 dp[i][j][0]：在 (i-1, j) 的所有方案末尾追加一个 0。
      if (i > limit) {
        dp[i][j][0] =
          dp[i - 1][j][0] + dp[i - 1][j][1] - dp[i - limit - 1][j][1];
      } else {
        dp[i][j][0] = dp[i - 1][j][0] + dp[i - 1][j][1];
      }
      dp[i][j][0] = norm(dp[i][j][0]);

      // 计算 dp[i][j][1]：在 (i, j-1) 的所有方案末尾追加一个 1。
      if (j > limit) {
        dp[i][j][1] =
          dp[i][j - 1][1] + dp[i][j - 1][0] - dp[i][j - limit - 1][0];
      } else {
        dp[i][j][1] = dp[i][j - 1][1] + dp[i][j - 1][0];
      }
      dp[i][j][1] = norm(dp[i][j][1]);
    }
  }

  return (dp[zero][one][0] + dp[zero][one][1]) % MOD;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：
     统计长度为 zero + one 的二进制数组数量，要求：
     1) 恰好有 zero 个 0、one 个 1；
     2) 任意连续相同数字的长度都不超过 limit。
   - 关键约束：
     1 <= zero, one, limit <= 200，适合二维动态规划。
   - 目标：
     返回总方案数，对 1e9+7 取模。

2. 状态设计

   为什么要记录“最后一位”：
   - 连续长度限制与“当前末尾是什么数字”强相关。
   - 把状态按末尾数字拆开，转移会更清晰。

   定义：
   - dp[i][j][0]：用了 i 个 0、j 个 1，且末尾是 0 的方案数。
   - dp[i][j][1]：用了 i 个 0、j 个 1，且末尾是 1 的方案数。

3. 转移推导

   A) 计算 dp[i][j][0]
   - 从所有 dp[i-1][j][0/1] 的方案后面加一个 0。
   - 但要去掉“加完后出现超过 limit 个连续 0”的非法方案。
   - 被减去的数量正是 dp[i-limit-1][j][1]：
     这些方案末尾是 1，再接 (limit+1) 个 0 会超限。
   - 得到：
     dp[i][j][0] = dp[i-1][j][0] + dp[i-1][j][1]
                   - dp[i-limit-1][j][1]   (i > limit)
     若 i <= limit，则不会因 0 超限，不需要减项。

   B) 计算 dp[i][j][1]
   - 完全对称：
     dp[i][j][1] = dp[i][j-1][1] + dp[i][j-1][0]
                   - dp[i][j-limit-1][0]   (j > limit)

4. 边界初始化
   - dp[i][0][0] = 1（当 i <= limit）
     只有全 0 一种排法，且必须不超过 limit。
   - dp[0][j][1] = 1（当 j <= limit）
     只有全 1 一种排法，且必须不超过 limit。
   - 其余默认 0。

5. 复杂度分析
   - 时间复杂度：O(zero * one)
     每个 (i, j) 只做 O(1) 计算。
   - 空间复杂度：O(zero * one)
     三维数组中最后一维固定为 2。

6. 示例分析

   示例 1：zero=1, one=1, limit=2
   - 可行数组：[0,1]、[1,0]
   - 答案 2。

   示例 2：zero=1, one=2, limit=1
   - 连续相同元素长度不能超过 1，因此必须严格交替。
   - 仅 [1,0,1] 可行，答案 1。

   示例 3：zero=3, one=3, limit=2
   - 不能出现长度 3 的同值连续段。
   - 按上述 DP 计算得到 14。

7. 常见错误
   - 忘记减去超限项，导致把非法方案算入结果。
   - 减法后未做“正模归一化”，出现负数取模错误。
   - 边界 `dp[i][0][0]` 与 `dp[0][j][1]` 初始化不完整。
   - 下标写错 `i-limit-1` 或 `j-limit-1`，出现越界或错减。

8. 优化说明
   - 当前递推已是 O(zero * one)，在本题约束下足够高效。
   - 代码中提炼 `norm` 函数统一处理取模与负值归一化，
     可读性和正确性都更好。
*/
